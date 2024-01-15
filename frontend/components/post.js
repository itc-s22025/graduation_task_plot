import {people} from "./data";
import {getImageUrl} from "./utils";
import s from "../src/styles/post.module.css"

const Post = () => {
    const listItems = people.map(person =>
        <li key={person.id} className={s.frame}>
                <div className={s.iconNidNname}>
                    <img
                        src={getImageUrl(person)}
                        alt={person.name}
                        className={s.icon}
                    />
                    <div>
                        <p className={s.userName}>
                            <b>{person.name}</b>
                        </p>
                        <p className={s.userId}>@{person.id}</p>
                        <p className={s.content}>Hi,there<br/>
                            this is {person.name}.
                        </p>
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