import s from "../src/styles/bio.module.css";
import {useEffect, useState} from "react";

const Bio = () => {
    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const [userId, setUserId] = useState("")
    const [bio, setBio] = useState("")


    useEffect(() => {
        fetch("http://localhost:3002/api/signin").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                setIcon(data[0].profileImg)
                setName(data[0].name)
                setUserId(data[0].username)
                setBio(data[0].bio)
            }
        )
    }, []);

    const getImageUrl = (data) =>{
        const img = 'https://i.imgur.com/' + data + 's.jpg'
        return (
            img
        );
    }

    return(
        <>

            <div className={s.frame}>
                <div className={s.iconNidNname}>
                    <img
                        src={getImageUrl(icon)}
                        alt={name}
                        className={s.icon}
                    />

                    <div>
                        <div className={s.nameNidNfosNfollow}>
                            <div className={s.nameNidNfos}>
                                <div className={s.nameNid}>
                                    <p className={s.userName}><b>{name}</b></p>
                                    <p className={s.userId}>@{userId}</p>
                                </div>
                                <div className={s.foNwer}>
                                    <p>12 Following</p>
                                    <p className={s.follower}>34 Follower</p>
                                </div>
                            </div>
                            <p className={s.edit}> Edit</p>
                        </div>
                        <p className={s.content}>{bio}<br/>テキストテキストテキスト</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Bio