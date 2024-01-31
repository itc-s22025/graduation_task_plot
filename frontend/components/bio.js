import s from "../src/styles/bio.module.css";
import {useEffect, useState} from "react";

const Bio = () => {
    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [bio, setBio] = useState("")


    useEffect(() => {
        fetch("http://localhost:3002/users/signin").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                setIcon(data[0].profileImg)
                setName(data[0].name)
                setUserName(data[0].userName)
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
                        alt={userName}
                        className={s.icon}
                    />

                    <div>
                        <div className={s.nameNidNfosNfollow}>
                            <div className={s.nameNidNfos}>
                                <div className={s.nameNid}>
                                    <p className={s.userName}><b>{name}</b></p>
                                    <p className={s.userId}>@{userName}</p>
                                </div>
                                <div className={s.foNwer}>
                                    <p>12 Following</p>
                                    <p className={s.follower}>34 Follower</p>
                                </div>
                            </div>
                            <p className={s.edit}> Edit</p>
                        </div>
                        <p className={s.content}>{bio}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Bio