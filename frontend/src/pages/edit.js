import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import s from '../styles/edit.module.css';

const Edit = ({ onSave }) => {
    const [newIcon, setNewIcon] = useState('');
    const [newBio, setNewBio] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchDeta = async () => {
            try {
                const res = await fetch("http://localhost:3002/api/user", {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(
                    response => response.json()
                ).then(
                    data => {
                        console.log("BIODATA---", data.user)
                        setUser(data.user)
                    }
                )
            }   catch (e) {
                console.error(e)
            }
        }
        fetchDeta()
    }, []);

    const getImage = (data) => {
        return ('https://i.imgur.com/' + data + 's.jpg');
    }

    const handleSave = () => {
        // 変更内容を保存する処理
        onSave({ icon: newIcon, bio: newBio });
        router.push('./Profile'); // プロフィールページにリダイレクト
    };

    return (
        <div className={s.container}>
            <h2>Edit Profile</h2>
            <div className={s.field}>
                <label className={s.label}>Icon:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewIcon(URL.createObjectURL(e.target.files[0]))}
                />
                <img src={newIcon} alt="New Avatar" className={s.newAvatar}/>
            </div>
            <div className={s.field}>
                <label className={s.label}>Bio:</label>
                <textarea
                    className={s.bioInput}
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    placeholder="Enter your bio..."
                />
            </div>
            <button className={s.saveButton} onClick={handleSave}>Save</button>
        </div>
    );
};

export default Edit;
