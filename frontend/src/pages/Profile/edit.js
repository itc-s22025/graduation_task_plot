import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import s from '../../styles/edit.module.css';

const Edit = ({user}) => {
    const [newIcon, setNewIcon] = useState(user ? user.icon : '');
    const [newBio, setNewBio] = useState(user ? user.bio : '');
    const router = useRouter();

    // 変更内容を保存する処理
    router.push('../Profile'); // プロフィールページにリダイレクト

    const getImage = (data) => {
        return ('https://i.imgur.com/' + data + 's.jpg');
    };

    const handleSave = async () => {
        try {
            const response = await fetch('../../../..background/pages/api/updateProfile', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: user.id, newIcon: newIcon, newBio: newBio}),
            });
            if (response.ok) {
                router.push({
                    pathname: '/Profile',
                    query: {user: JSON.stringify({...user, icon: newIcon, bio: newBio}) },
                });
            } else {
                console.error('Failed to update profile data');
            }
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };
    console.log('New Icon:', newIcon);
    console.log('New Bio:', newBio);


return (
    <div className={s.container}>
        <h2>Edit Profile</h2>
        <div className={s.field}>
            <label htmlFor="avatar" className={s.label}>
                Icon
            </label>
            <input
                type="file"
                accept="image/*"
                id="avatar"
                onChange={(e) => setNewIcon(URL.createObjectURL(e.target.files[0]))}
            />
            <img src={newIcon} alt="New Avatar" className={s.newAvatar} />
        </div>
        <div className={s.field}>
            <label htmlFor="bio" className={s.label}>
                Bio
            </label>
            <textarea
                id="bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className={s.bioInput}
                placeholder="Enter your bio..."
            />
        </div>
        <button onClick={handleSave}>Save</button>
    </div>
);
};

export default Edit;
