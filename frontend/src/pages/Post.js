import React, { useEffect, useRef, useState } from 'react';
import s from '../styles/Post.module.css';
import SquarePhotoCard from "../component/SquarePhotoCard";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";
import axios from 'axios';

function Post() {
    const [tweet, setTweet] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [inMenuVisible, setIsMenuVisible] = useState(false);
    //userデータ反映
    const [name, setName] = useState('')
    const [menu, setMenu] = useState('')
    const [time, setTime] = useState()
    const [timeUnit, setTimeUnit] = useState('')

    const inputRef = useRef(null);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const response = await axios.get(`http://${location.hostname}:3002/users/signin`, { withCredentials: true });
            setName(response.data.user.name);
        } catch (error) {
            console.log(error);
        }
    }

    const handleTweetChange = (event) => {
        const inputText = event.target.value;
        // 文字数制限
        const maxLength = 180;
        if (inputText.length <= maxLength) {
            setTweet(inputText);
        }
    };

    const handleImageSelect = (event) => {
        const files = event.target.files;

        if (files.length > 0) {
            const selectedImage = URL.createObjectURL(files[0]);
            setSelectedImage(selectedImage);
        }
    };

    const handleTweetSubmit = async () => {
        try {
            const response = await axios.post(`http://${location.hostname}:3002/posts/create`, {
                text: tweet,
                image: selectedImage,
                menu: menu,
                time: time,
                timeUnit: timeUnit
            }, { withCredentials: true });
            if (response.status === 201) {
                console.log("できた", response);
                window.location.href = "/Home";
            } else {
                console.log("できてない", response);
            }
        } catch (error) {
            console.error("エラーでてます: ", error);
        }
    };

    const handleDumbbellClick = () => {
        setIsMenuVisible(!inMenuVisible);
    };

    const handleLabelClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleRemovePost = () => {
        const shouldDelete = window.confirm("本当に削除してもいいですか？");
        if (shouldDelete) {
            // 削除後の処理をここに追加する
            window.location.href = '/Home';
        }
    };

    return (
        <>
            <Header title="Post"/>
            <FrameLayout/>
            <div className={s.all}>
                <div className={s.container}>
                    <div className={s.boxLarge}>
                        <div className={s.iconimage}>
                            <img src="" alt={name}/>
                        </div>
                        <p className={s.name}>{name}</p>
                        <textarea
                            className={s.textarea}
                            placeholder="Type today's muscle..."
                            value={tweet}
                            onChange={handleTweetChange}
                        />
                        {inMenuVisible && (
                            <div className={s.menu}>
                                <textarea
                                    className={s.trainingmenu}
                                    placeholder="Training Menu..."
                                    value={menu}
                                    onChange={(e) => setMenu(e.target.value)}
                                />
                                <div className={s.menu_container}>
                                    <select className={s.number} value={time} onChange={(e) => setTime(parseInt(e.target.value))}>
                                        <option>num</option>
                                        <option>1</option>
                                        <option>5</option>
                                        <option>10</option>
                                        <option>15</option>
                                        <option>20</option>
                                        <option>25</option>
                                        <option>30</option>
                                        <option>35</option>
                                        <option>40</option>
                                        <option>45</option>
                                        <option>50</option>
                                        <option>55</option>
                                        <option>60</option>
                                    </select>
                                    <select className={s.time} value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
                                        <option>unit</option>
                                        <option>times</option>
                                        <option>seconds</option>
                                        <option>minutes</option>
                                    </select>
                                    <textarea className={s.add_trainingmenu} placeholder="Add More"/>
                                    <img src='/images/add_more.png' className={s.add_more}/>
                                </div>
                            </div>
                        )}
                        {selectedImage ? (
                            <div className={s.imageContainer}>
                                <img src={selectedImage} alt="Selected Image" className={s.selectedImage}/>
                                <div className={s.removeButton} onClick={handleRemoveImage}>
                                    <img src='/images/crossline.png' className={s.cross}/>
                                </div>
                            </div>
                        ) : (
                            <SquarePhotoCard img src="" alt={name}/>
                        )}
                        <div className={s.button}>
                            <button className={s.cancel} onClick={handleRemovePost}>Cancel</button>
                            <button className={s.post} onClick={handleTweetSubmit}>Post</button>
                        </div>
                        <div className={s.icons_container}>
                            <input
                                type="file"
                                accept="image/*"
                                id="imageInput"
                                className={s.imageInput}
                                onChange={handleImageSelect}
                                ref={inputRef}
                                style={{display: 'none'}}
                                multiple
                            />
                            <img src="/images/link.png" className={s.icons}/>
                            <img src="/images/dumbbell.png" className={s.icons} onClick={handleDumbbellClick}/>
                            <label htmlFor="imageInput" className={s.icons} onClick={handleLabelClick}>
                                <img src="/images/image.png" className={s.icons}/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
