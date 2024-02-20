import s from "../styles/bio.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/header.js";
import FrameLayout from "../../components/frameLayout.js";
import OthersBioBar from "../../components/othersBioBar.js";
import { getUserData } from "../../components/utils.js";

const Other = () => {
    const router = useRouter();

    const [user, setUser] = useState([]);
    const [myId, setMyId] = useState();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userData = await getUserData();
            setMyId(userData.id);

            const res = await fetch(
                `http://${location.hostname}:3002/users/${router.query.userName}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await res.json();
            setUser(data.user);
            checkIfFollowing(userData.id, data.user.id);
        } catch (error) {
            console.error(error);
        }
    };

    const checkIfFollowing = async (followerId, followeeId) => {
        try {
            const res = await fetch(
                `http://${location.hostname}/users/follow`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setIsFollowing(res.status === 200);
        } catch (error) {
            console.error("Error checking follow status:", error);
        }
    };

    const handleFollow = async () => {
        try {
            const res = await fetch(
                `http://${location.hostname}:3002/users/follow`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        follower_id: myId,
                        followee_id: user.id,
                    }),
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
            <Header title={user.userName} />
            <FrameLayout />

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
                                    <p>12 Following</p>
                                    <p className={s.follower}>34 Follower</p>
                                </div>
                            </div>
                            {!isFollowing && <p className={s.edit} onClick={handleFollow}>Follow</p>}
                            {isFollowing && <p className={s.edit} onClick={handleFollow}>Following</p>}
                        </div>
                        <p className={s.content}>{user.bio}</p>
                    </div>
                </div>
            </div>

            <OthersBioBar />
        </>
    );
};

export default Other;
