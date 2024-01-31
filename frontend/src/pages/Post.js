
import React, { useRef, useState } from 'react';
import s from '../styles/Post.module.css';
import SquarePhotoCard from "../component/SquarePhotoCard";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";

function App() {
    const [tweet, setTweet] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [inMenuVisible, setIsMenuVisible] = useState(false);
    const inputRef = useRef(null);

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

    const handleTweetSubmit = () => {
        console.log('Tweet submitted:', tweet);
        console.log('Selected Images:', selectedImage);
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
            console.log("Post deleted!");
        }
    };


    return (
        <div>
            <Header title="Post"　/>
            <FrameLayout />
            <div className={s.all}>
                <div className={s.container}>
                    <div className={s.boxLarge}>
                        <p className={s.name}>Name</p>
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
                                />
                                <div className={s.menu_container}>
                                    <select className={s.number}>
                                        <option>num</option>
                                        <option>15</option>
                                    </select>
                                    <select className={s.time}>
                                        <option>times</option>
                                        <option>minute</option>
                                    </select>
                                    <textarea
                                        className={s.add_trainingmenu}
                                        placeholder="Add More"
                                    />
                                    <img src='/images/add_more.png' className={s.add_more} />
                                </div>
                            </div>
                        )}

                        {selectedImage ? (
                            <div className={s.imageContainer}>
                                <img src={selectedImage} alt="Selected Image" className={s.selectedImage} />
                                <div className={s.removeButton} onClick={handleRemoveImage}>
                                    <img src='/images/crossline.png' className={s.cross} />
                                </div>
                            </div>
                        ) : (
                            <SquarePhotoCard img src="/images/_ (5).jpeg" alt={"Some description"} />
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
                                style={{ display: 'none' }}
                                multiple
                            />
                            <img src="/images/link.png" className={s.icons} />
                            <img src="/images/dumbbell.png" className={s.icons} onClick={handleDumbbellClick} />
                            <label htmlFor="imageInput" className={s.icons} onClick={handleLabelClick}>
                                <img src="/images/image.png" className={s.icons} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
