import s from "../styles/bio.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Header from "../../components/header.js";
import FrameLayout from "../../components/frameLayout.js";
import OthersBioBar from "../../components/othersBioBar.js";
import {fetchFollower, getUserData} from "../../components/utils.js";

const Other = () => {
    const router = useRouter();

    const [user, setUser] = useState([]);
    const [myId, setMyId] = useState();
    const [isFollowing, setIsFollowing] = useState(false);
    const [following, setFollowing] = useState(0);
    const [follower, setFollower] = useState(0);

    useEffect(() => {
        fetchUserData();
        fetchFollower().then(
            data => {
                let followerCount = 0;
                for (const follow of data){
                    if (follow.followee_id === user.id){
                        followerCount++;
                    }
                    setFollower(followerCount);
                }
            })
    }, [user]);

    const fetchUserData = async () => {
        try {
            const userData = await getUserData();
            setMyId(userData.id);

            const res = await axios.get(
                `http://${location.hostname}:3002/users/${router.query.userName}`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = res.data;
            setUser(data.user);
            let followCount = 0;
            for (const follow of data.user.follows) {
                if (data.user.follows.length > 0) {
                    followCount++;
                }
            }
            setFollowing(followCount);
            checkIfFollowing(userData.id, data.user.id);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user.id) {
            checkIfFollowing(myId, user.id);
        }
    }, [user]);

    const checkIfFollowing = async (followerId, followeeId) => {
        try {
            const res = await axios.get(
                `http://${location.hostname}:3002/users/follow`,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = res.data;

            for (const i of data.followlist) {
                if (i.follower_id === followerId && i.followee_id === followeeId) {
                    setIsFollowing(true);
                    return;
                }
            }
            setIsFollowing(false);
        } catch (error) {
            console.error("Error checking follow status:", error);
        }
    };

    const handleFollow = async () => {
        try {
            const res = await axios.post(
                `http://${location.hostname}:3002/users/follow`,
                {
                    follower_id: myId,
                    followee_id: user.id,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 201) {
                setIsFollowing(true);
                console.log("Follow successful");
            } else {
                console.log("Failed to follow user");
            }
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const getImage = (data) => {
        return "https://i.imgur.com/" + data + "s.jpg";
    };

    return (
        <>
            <Header title={user.userName}/>
            <FrameLayout/>

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
                                    <p className={s.userName}>
                                        <b>{user.name}</b>
                                    </p>
                                    <p className={s.userId}>@{user.userName}</p>
                                </div>
                                <div className={s.foNwer}>
                                    <p>{following} Following</p>
                                    <p className={s.follower}>{follower} Followers</p>
                                </div>
                            </div>
                            {!isFollowing && <p className={s.edit} onClick={handleFollow}>Follow</p>}
                            {isFollowing && <p className={s.following} onClick={handleFollow}>Following</p>}
                        </div>
                        <p className={s.content}>{user.bio}</p>
                    </div>
                </div>
            </div>

            <OthersBioBar/>
        </>
    );
};

export default Other;
