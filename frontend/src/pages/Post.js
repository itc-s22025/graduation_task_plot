import React, {useRef, useState} from 'react';
import s from '../styles/Post.module.css'
import SquarePhotoCard from "../component/SquarePhotoCard";
import {images} from "next/dist/build/webpack/config/blocks/images";

function App() {
    const [tweet, setTweet] = useState('');
    const [selectedImage, setSelectedImages] = useState(null);

    const inputRef = useRef(null);
    const handleTweetChange = (event) => {
        const inputText = event.target.value;
    //文字数制限
        const maxLength = 180;
        if (inputText.length <= maxLength) {
            setTweet(inputText);
    }
};
    const handleImageSelect = (event) => {
        const files = event.target.files;
        const newImages = Array.from(files).map(file => URL.createObjectURL(file));

        setSelectedImages(prevImages => {
            if (Array.isArray(prevImages)) {
            return [...prevImages, ...newImages];
        } else {
            return [...newImages];
        }
    });
        /*if (file) {
            setSelectedImage(URL.createObjectURL(file));
        } else {
            setSelectedImage(null);
        }*/
    };
    const handleTweetSubmit = () => {
        // ここで投稿の処理を追加する
        console.log('Tweet submitted:', tweet);
        console.log('Selected Images:', setSelectedImages);
    };

    const handleLabelClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className={s.all}>
            <div className={s.container}>
                 <div className={s.boxLarge}>
                     <p className={s.name}>Name</p>
         <textarea
            className={s.textarea}
            placeholder="What's happening?"
            value={tweet}
            onChange={handleTweetChange}
        />
                {selectedImage ? (
                    <img key={index} src={images} alt={`Selected Image ${index + 1}`} className={s.selectedImage} />
                ) : (
                    <SquarePhotoCard img src="/images/_ (5).jpeg" alt={"Some description"} />
                )}
                <div className={s.button}>
                    <h4 className={s.cancel}>Cancel</h4>
                    <h4 className={s.post} onClick={handleTweetSubmit}>Post</h4>
                </div>
                <div className={s.icons_container}>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageInput"
                        className={s.imageInput}
                        onChange={handleImageSelect}
                        ref={inputRef}
                        style={{ display: 'none'}}
                        multiple
                    />
                    <img src="/images/link.png" className={s.icons} />
                    <img src="/images/dumbbell.png" className={s.icons} />
                    <label htmlFor="imageInput" className={s.icons} onClick={handleLabelClick}>
                    <img src="/images/image.png" className={s.icons} />
                    </label>
                    </div>
                 </div>
            </div>
        </div>
    );
}



export default App;
