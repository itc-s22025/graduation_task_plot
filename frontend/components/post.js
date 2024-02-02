import {people} from "./data";
import {getImageUrl} from "./utils";
import s from "../src/styles/post.module.css"
import {useState, useEffect} from "react";

const Post = () => {
    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [text, setText] = useState("")
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

    const [likecount, setLikecount] = useState(0)
    const [rpcount, setRpcount] = useState(0)

    const handleLikeClick = () => {
        setLikecount(likecount + 1)
    }
    const handleRpClick = () => {
        setRpcount(rpcount + 1)
    }

    const postItems = posts.map(post =>
        <li key={post.id} className={s.frame}>
            <div className={s.iconNidNname}>
                <img src={getImageUrl(post.user)} alt={post.user.userName} className={s.icon}/>
                <div>
                    <div className={s.nameNidNconNlike}>
                        <b className={s.userName}>{post.user.name}</b>
                        <p className={s.userId}>@{post.user.userName}</p>
                    </div>
                    <p className={s.content}>{post.text}</p>
                </div>
                <div className={s.likeNrp}>
                    <span className={s.like} onClick={handleLikeClick}>♡ {likecount} </span>
                    <span className={s.repost} onClick={handleRpClick}>☆ {rpcount} </span>
                </div>
            </div>
        </li>
    );

    const listItems = people.map(person =>
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
                        this is {person.name}.
                    </p>
                </div>
                <div className={s.likeNrp}>
                    <span className={s.like} onClick={handleLikeClick}>♡ {likecount} </span>
                    <span className={s.repost} onClick={handleRpClick}>☆ {rpcount} </span>
                </div>
            </div>
        </li>
    );


    return (
        <>

            {/*<article>*/}
            {/*    <ul>{listItems}</ul>*/}
            {/*</article>*/}

            <article>
                <ul>{postItems}</ul>
            </article>


        </>
    )
}

export default Post