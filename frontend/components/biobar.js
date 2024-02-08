import s from '../src/styles/biobar.module.css'
import {useEffect, useState} from "react";
import {getImageUrl} from "./utils";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";

const BioBar = () => {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [likecount, setLikecount] = useState({});
    const [rpcount, setRpcount] = useState({});

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3002/api/user", {
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
        fetchData();
    }, [])

    const getImage = (data) => {
        return ('https://i.imgur.com/' + data + 's.jpg');
    }


    const postItems = posts && posts.length > 0 && (
        posts.map(post =>
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
        )
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
                    <h1>media</h1>
                </TabPanel>
                <TabPanel>
                    <h1>Likes</h1>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default BioBar