import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import s from '../../styles/edit.module.css';

const Edit = () => {
    const [newIcon, setNewIcon] = useState();
    const [newBio, setNewBio] = useState('');
    const router = useRouter();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${location.hostname}:3002/api/user`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = response.data;
                console.log("BIODATA---", data.user);
                setUser(data.user);
                setNewBio(data.user.bio);
                setNewIcon(data.user.icon);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://${location.hostname}:3002/api/updateProfile`, {
                userId: user.id,
                newIcon: newIcon,
                newBio: newBio
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                window.location.href = '/Profile';
            } else {
                console.error('Failed to update profile data');
            }
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };

    const handleCancel = () => {
        window.location.href = '/Profile';
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
            <div className={s.ButtonFlex}>
                <button onClick={handleCancel} className={s.cancelButton}>Cancel</button>
                <button onClick={handleSave} className={s.saveButton}>Save</button>
            </div>
        </div>
    );
};

export default Edit;
