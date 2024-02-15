import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import s from '../../styles/edit.module.css';

    const Edit = () => {
        const [newIcon, setNewIcon] = useState();
        const [newBio, setNewBio] = useState();
        const router = useRouter();
        const [user, setUser] = useState([]);


        // 変更内容を保存する処理

        const getImage = (data) => {
            return ('https://i.imgur.com/' + data + 's.jpg');
        };

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
                            setNewBio(data.user.bio)
                            setNewIcon(data.user.icon)
                        }
                    )
                } catch (e) {
                    console.error(e)
                }
            }
            fetchDeta()
        }, []);


        const handleSave = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/updateProfile', {
                    method: 'PUT',
                    credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({userId: user.id, newIcon: newIcon, newBio: newBio}),
                    });
                    if (response.ok) {
                    // router.push({
                    //     pathname: '/Profile',
                    //     query: {user: JSON.stringify({...user, icon: newIcon, bio: newBio}) },
                    // });
                    window.location.href = '/Profile'
                } else {
                    console.error('Failed to update profile data');
                }
            } catch (error) {
                    console.error('Error updating profile data:', error);
                }
            };

        const handleCancel = () => {
            window.location.href = '/Profile'
        }

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
                    <div className={s.ButtonFlex}>
                        <button onClick={handleCancel} className={s.cancelButton}>Cancel</button>
                        <button onClick={handleSave} className={s.saveButton}>Save</button>
                    </div>
                </div>
            );
        };
        export default Edit;