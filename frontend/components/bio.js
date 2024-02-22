import s from "../src/styles/bio.module.css";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {getImage, getUserData, fetchFollower} from "./utils.js";
import Edit from "../src/pages/Profile/edit.js";

const Bio = () => {
    const [user, setUser] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [following, setFollowing] = useState(0)
    const [follower, setFollower] = useState(0);

    const router = useRouter();


    useEffect(() => {
        getUserData().then(
            data => {
                setUser(data)
                let followCount = 0
                for (const follow of data.follows) {
                    if (data.follows.length > 0) {
                        followCount++;
                    }
                    setFollowing(followCount)
                }
            })
        fetchFollower().then(
            data => {
                let followerCount = 0;
                for (const follow of data){
                    if (follow.followee_id === user.id){
                        followerCount++;
                    }
                    setFollower(followerCount);
                }
            }
        )
    }, [user]);


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
                                        <p className={s.follower}>{follower} Followers</p>
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
                <Edit/>
            )}
        </>
    );
}
export default Bio
