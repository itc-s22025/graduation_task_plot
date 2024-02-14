import {people} from "./data";
import {getImageUrl} from "./utils";
import s from "../src/styles/post.module.css"
import {useState, useEffect} from "react";
import {useRouter} from "next/router";


const Post = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:3002/api/all", {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(
                    response => response.json()
                ).then(
                    data => {
                        console.log("DATA", data)
                        setPosts(data.latestPosts)
                        console.log("ぽすつ：", posts)
                    }
                )
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, []);


    const getImage = (data) => {
        return ('https://i.imgur.com/' + data + 's.jpg');
    }

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

    const postItems = posts.map(post =>
        <li key={post.id} className={s.frame}>
            <div className={s.iconNidNname}>
                <img
                    src={getImageUrl(post.user)}
                    alt={post.user.userName}
                    className={s.icon}/>
                <div>
                    <div className={s.nameNidNconNlike}>
                        <b className={s.userName}>{post.user.name}</b>
                        <p className={s.userId}>@{post.user.userName}</p>
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


    const listItems = people && people.length > 0 && (
        people.map(person =>
                <li key={person.id} className={s.frame}>
                    <div className={s.iconNidNname}>
                        <img
                            src={getImageUrl(person)}
                            alt={person.name}
                            className={s.icon}
                        />
                        <div>
                            <div className={s.nameNidNconNlike}>
                                <p className={s.userName}>
                                    <b>{person.name}</b>
                                </p>
                                <p className={s.userId}>@{person.id}</p>
                            </div>
                            <p className={s.content}>Hi,there.<br/>
                                {/*this is {person.name}.*/}
                            </p>
                        </div>
                        <div className={s.likeNrp}>
                    <span className={s.like}
                          onClick={() => handleLikeClick(person.id)}>♡ {likecount[person.id] || 0} </span>
                            <span className={s.repost}
                                  onClick={() => handleRpClick(person.id)}>☆ {rpcount[person.id] || 0} </span>
                        </div>
                    </div>
                </li>
        )
    );
    return (
        <>

            <article>
                <ul>{postItems}</ul>
            </article>


        </>
    )
}

export default Post