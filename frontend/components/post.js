import {people} from "./data";
import {getImageUrl} from "./utils";
import s from "../src/styles/post.module.css"
import {useState, useEffect} from "react";

const Post = () => {
    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const [userId, setUserId] = useState("")
    const [bio, setBio] = useState("")

    useEffect(() => {
        fetch("http://localhost:3002/api/signin").then(
            res => res.json()
        ).then(
            data => {
                data.map(user => {
                    console.log("user:", user)
                })
                setData(data)
                console.log("name:", name)
                console.log(data)
            }
        )
    }, []);

    const setData = (udata) => {
        setIcon(udata[0].profileImg)
        setName(udata[0].name)
        setUserId(udata[0].username)
        setBio(udata[0].bio)
    }

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
                        <div>
                            <p className={s.userName}>
                                <b>{person.name}</b>
                            </p>
                            <p className={s.userId}>@{person.id}</p>
                        </div>

                    </div>
                    <p className={s.content}>Hi,there.<br/>
                        this is {person.name}.
                    </p>

                </div>
                <div className={s.likeNrp}>
                    <span className={s.like} onClick={() => handleLikeClick(person.id)}>♡ {likecount[person.id] || 0 } </span>
                    <span className={s.repost} onClick={() => handleRpClick(person.id)}>☆ {rpcount[person.id] || 0 } </span>
                </div>
            </div>
        </li>
    );


    return (
        <>

            <article>
                <ul>{listItems}</ul>
            </article>

            <div className={s.frame}>
                <div className={s.iconNidNname}>
                    <img
                        src={getImage(icon)}
                        alt={name}
                        className={s.icon}
                    />

                    <div>
                        <div className={s.nameNidNfosNfollow}>
                            <div className={s.nameNidNfos}>
                                <div className={s.nameNid}>
                                    <p className={s.userName}><b>{name}</b></p>
                                    <p className={s.userId}>@{userId}</p>
                                </div>
                            </div>
                        </div>
                        <p className={s.content}>{bio}<br/>テキストテキストテキスト</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Post