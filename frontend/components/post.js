import {people} from "./data";
import {getImageUrl} from "./utils";
import s from "../src/styles/post.module.css"
import {useState, useEffect} from "react";

const Post = () => {
    const [likecount, setLikecount] = useState(0)
    const [rpcount, setRpcount] = useState(0)

    const handleLikeClick = () => {
        setLikecount(likecount + 1 )
    }

    const handleRpClick = () => {
        setLikecount(likecount + 1 )
    }
    const [user, setUser] = useState([])

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

    return(
        <article>
            <ul>{listItems}</ul>
        </article>
    )
}

export default Post