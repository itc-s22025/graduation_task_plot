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
                const res = await fetch("http://localhost:3002/api/all");
                const data = await res.json()
                console.log("入ってきたデータ：", data)
                setData(data);
                setPosts(data);
                console.log("POSTS: ", posts);
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, []);

    const setData = (post) => {
        // setIcon(udata[0].profileImg)
        setName(post.latestPosts[0].user.name)
        setUserName(post.latestPosts[0].user.userName)
        setText(post.latestPosts[0].text)
    }


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
                    <span className={s.like} onClick={handleLikeClick}>♡ {likecount} </span>
                    <span className={s.repost} onClick={handleRpClick}>☆ {rpcount} </span>
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
                        alt={userName}
                        className={s.icon}
                    />

                    <div>
                        <div className={s.nameNidNfosNfollow}>
                            <div className={s.nameNidNfos}>
                                <div className={s.nameNid}>
                                    <p className={s.userName}><b>{name}</b></p>
                                    <p className={s.userId}>@{userName}</p>
                                </div>
                            </div>
                        </div>
                        <p className={s.content}>{text}<br/>テキストテキストテキスト</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Post