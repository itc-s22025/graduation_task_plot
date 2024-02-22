//一旦ページごと作って時間あればコンポーネント化

import s from '../src/styles/othersbiobar.module.css'
import {useEffect, useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {useRouter} from "next/router";
import axios from 'axios';
import {getImage, handleLikeClick} from "./utils.js";

const OthersBioBar = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [likecount, setLikecount] = useState({});
    const [rpcount, setRpcount] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const handleLikeClickWrapper = async (postId) => {
        await handleLikeClick(postId, likecount, setLikecount);
    };

    const handleRpClick = (post) => {
        if (!rpcount[post]) {
            setRpcount((prevCounts) => ({
                ...prevCounts,
                [post]: (prevCounts[post] || 0) + 1
            }));
        } else {
            setRpcount((prevCounts) => ({
                ...prevCounts,
                [post]: 0,
            }));
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://${location.hostname}:3002/users/${router.query.userName}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = res.data;
            setPosts(data.user.post);
            setUser(data.user);
            let likeCounts = 0;
            for (const post of data.user.post) {
                if (post.likes.length > 0) {
                    likeCounts++;
                } else {
                    likeCounts = 0;
                }
            }
            setLikecount(likeCounts);
        } catch (e) {
            console.log(e);
        }
    };

    const postItems = posts.map(post =>
        <li key={post.id} className={s.frame}>
            <div className={s.iconNidNname}>
                <img src="/フリーアイコン.png" alt={user.userName} className={s.icon}/>
                <div>
                    <div className={s.nameNidNconNlike}>
                        <b className={s.userName}>{user.name}</b>
                        <p className={s.userId}>@{user.userName}</p>
                    </div>
                    <p className={s.content}>{post.text}</p>
                    {post.menu && (
                        <div className={s.dumbbell}>
                            <p className={s.menu}>{post.menu}</p>
                            {post.time && (
                                <div className={s.timeNtimeUnit}>
                                    <p className={s.time}>{post.time}</p>
                                    <p className={s.timeUnit}>{post.timeUnit}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={s.likeNrp}>
                <span className={s.like}
                      onClick={() => handleLikeClickWrapper(post.id)}>♡ {likecount[post.id] || 0} </span>
                <span className={s.repost} onClick={() => handleRpClick(post.id)}>☆ {rpcount[post.id] || 0} </span>
            </div>
        </li>
    );

    return (
        <>
            <Tabs>
                <TabList className={s.all}>
                    <Tab className={s.box}>POST</Tab>
                    <Tab className={s.box}>MEDIA</Tab>
                </TabList>

                <TabPanel>
                    <article>
                        {postItems}
                    </article>
                </TabPanel>

                <TabPanel>
                    <article>
                        <h1>MEDIA</h1>
                    </article>
                </TabPanel>
            </Tabs>
        </>
    );
}

export default OthersBioBar;
