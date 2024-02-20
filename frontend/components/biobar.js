import s from '../src/styles/biobar.module.css'
import {useEffect, useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {getImage, handleLikeClick} from "./utils.js";

const BioBar = () => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [likedPosts, setLikedPosts] = useState([])
    const [userHaveLike, setUserHaveLike] = useState({})
    const [likecount, setLikecount] = useState({});
    const [rpcount, setRpcount] = useState({});

    const handleLikeClickWrapper = (postId) => {
        handleLikeClick(postId, likecount, setLikecount);
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://${location.hostname}:3002/users/signin`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(
                    response => response.json()
                ).then(
                    data => {
                        setPosts(data.user.post)
                        setUser(data.user)
                    }
                )
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
        fetchLikes()
    }, [])

    const fetchLikes = async () => {
        try {
            const res = await fetch(`http://${location.hostname}:3002/users/likes`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(
                response => response.json()
            ).then(
                data => {
                    setLikedPosts(data.likes)
                    // setUserHaveLike(data.likes.user)
                    console.log("フェッチしたいいねのデータ：", data.likes)
                    // console.log("setLikePosts：", data.likes[0].post)
                }
            )
        }catch (e) {
            console.log("biobarいいねのフェッチエラー->",e)
        }
    }

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
    )

    const likedItems = likedPosts.map(post =>
        <li key={post.post.id} className={s.frame}>
            <div className={s.iconNidNname}>
                <img src="/フリーアイコン.png" alt={post.post.user.userName} className={s.icon}/>
                <div>
                    <div className={s.nameNidNconNlike}>
                        <b className={s.userName}>{post.post.user.name}</b>
                        <p className={s.userId}>@{post.post.user.userName}</p>
                    </div>
                    <p className={s.content}>{post.post.text}</p>
                    {post.menu && (
                        <div className={s.dumbbell}>
                            <p className={s.menu}>{post.post.menu}</p>
                            {post.time && (
                                <div className={s.timeNtimeUnit}>
                                    <p className={s.time}>{post.post.time}</p>
                                    <p className={s.timeUnit}>{post.post.timeUnit}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={s.likeNrp}>
                <span className={s.like}
                      onClick={() => handleLikeClickWrapper(post.post.id)}>♡ {likecount[post.post.id] || 0} </span>
                <span className={s.repost} onClick={() => handleRpClick(post.post.id)}>☆ {rpcount[post.post.id] || 0} </span>
            </div>
         </li>
    )


    return (
        <>
            <Tabs>
                <TabList className={s.all}>
                    <Tab className={s.box}>POST</Tab>
                    <Tab className={s.box}>MEDIA</Tab>
                    <Tab className={s.box}>LIKES</Tab>
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
                <TabPanel>
                    <article>
                        {likedItems}
                    </article>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default BioBar