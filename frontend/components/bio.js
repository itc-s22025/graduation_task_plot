import s from "../src/styles/bio.module.css";
import {useEffect, useState} from "react";
import {getImage} from "./utils.js";

const Bio = () => {
    const [user, setUser] = useState([])
    const [icon, setIcon] = useState("")

    useEffect(() => {
        fetchDeta()
    }, []);

    const fetchDeta = async () => {
        try {
            const res = await fetch("http://localhost:3002/users/signin", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(
                response => response.json()
            ).then(
                data => {
                    setUser(data.user)
                }
            )
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>

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
                            <p className={s.edit}> Edit</p>
                        </div>
                        <p className={s.content}>{user.bio}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Bio