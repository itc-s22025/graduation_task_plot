import s from "../src/styles/bio.module.css";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {getImage, getUserData} from "./utils.js";
import Edit from "../src/pages/Profile/edit.js";

const Bio = () => {
    const [user, setUser] = useState([])
    const [icon, setIcon] = useState("")
    const [isEditMode, setIsEditMode] = useState(false)
    const [following, setFollowing] = useState(0)

    const router = useRouter();


    useEffect(() => {
        getUserData().then(
            data => {setUser(data)
                for (const follow of data.follows){
                    let followCount = 0
                    if (data.follows.length > 0){
                        followCount = followCount + 1
                    }else {
                        followCount = 0
                    }
                    setFollowing(followCount)
                }}
        )
    }, []);

    const handleEditClick = () => {
        setIsEditMode(true)
    };


    return (
        <>
            {!isEditMode && user && (
                <div className={s.frame} key={user.id}>
                    <div className={s.iconNidNname}>
                        <img
                            src="/フリーアイコン.png"
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
                                        <p>{following} Following</p>
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

            {isEditMode && (
                <Edit />
            )}
        </>
    );
}
export default Bio
