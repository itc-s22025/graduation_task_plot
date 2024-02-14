import s from "../src/styles/bio.module.css";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router'

const Bio = () => {
    const [user, setUser] = useState([])
    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")
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
            } catch (e) {
                console.error(e)
            }
        }
        fetchDeta()
    }, []);
    const getImage = (data) => {
        return ('https://i.imgur.com/' + data + 's.jpg');
    }
    const handleEditClick = () => {
        // router.push('./edit');
        console.log("onclick")
        router.push('/Profile/edit');
    };

    return (
        <>
            {user && (
                <div className={s.frame} key={user.id}>
                    <div className={s.iconNidNname}>
                        <img
                            src={getImage(icon)}
                            alt={user.userName}
                            className={s.icon}
                        />
                        <div>
                            <div className={s.nameNidNfosNfollow}>
                                <div className={s.nameNidNfos}>
                                    <div className={s.nameNid}>
                                        <p className={s.userName}><b>{user.name}</b></p>
                                        <p className={s.userId}>@{user.userName}</p>
                                    </div>
                                    <div className={s.foNwer}>
                                        <p>12 Following</p>
                                        <p className={s.follower}>34 Follower</p>
                                    </div>
                                </div>
                                <p className={s.edit} onClick={handleEditClick}> Edit</p>
                            </div>
                            <p className={s.content}>{user.bio}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default Bio
