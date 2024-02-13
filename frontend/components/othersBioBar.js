//一旦OthersBioBarコンポーネント　時間があればこれ消してBioBarだけでできるようにする

import s from '../src/styles/biobar.module.css'
import {useEffect, useState} from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import {useRouter} from "next/router";


const OthersBioBar = () => {
    const router = useRouter()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [likecount, setLikecount] = useState({});
    const [rpcount, setRpcount] = useState({});

    useEffect(() => {
        console.log("query:", router.query)
        fetchData()
    }, []);

    const handleLikeClick = (postId) => {
        if (!likecount[postId]) {
            setLikecount((prevCounts) => ({
                ...prevCounts,
                [postId]: (prevCounts[postId] || 0) + 1
            }));
        } else {
            setLikecount((prevCounts) => ({
                ...prevCounts,
                [postId]: 0,
            }));
        }
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
            const res = await fetch(`http://localhost:3002/users/${router.query.userName}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("DATA:", data.user)
                    setPosts(data.user.post)
                    setUser(data.user)
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    const getImage = (data) => {
        return ('https://i.imgur.com/' + data + 's.jpg');
    }


    const postItems = posts.map(post =>
        <li key={post.id} className={s.frame}>
            <div className={s.iconNidNname}>
                <img src={getImage(post.user)} alt={user.userName} className={s.icon}/>
                <div>
                    <div className={s.nameNidNconNlike}>
                        <b className={s.userName}>{user.name}</b>
                        <p className={s.userId}>@{user.userName}</p>
                    </div>
                    <p className={s.content}>{post.text}</p>
                </div>
            </div>
            <div className={s.likeNrp}>
                <span className={s.like} onClick={() => handleLikeClick(post.id)}>♡ {likecount[post.id] || 0} </span>
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
                        <h1>LIKES</h1>
                    </article>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default OthersBioBar