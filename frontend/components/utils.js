import Router from 'next/router'
import s from "../src/styles/biobar.module.css";

export const getImage = (data) => {
    return ('https://i.imgur.com/' + data + 's.jpg');
}

export const onUserClick = async (userName, myName) => {
    try {
        const res = await fetch(`http://localhost:3002/users/${userName}`, {
            method: 'GET',
            credentials: "include"
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
            }
        )
        if (userName === myName){
            window.location.href = '/Profile'
        }else {
            console.log(userName)
            Router.push({
                    pathname: '/Other',
                    query: {userName},
                },
                {shallow: true});
        }
    } catch (e) {
        console.log(e)
    }};

export const fetchAllPosts = async () => {
    try {
        const res = await fetch("http://localhost:3002/posts/all", {
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
                return data.latestPosts;
            }
        );
        return res;
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const fetchMyName = async () => {
    try {
        const res = await fetch("http://localhost:3002/users/signin", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            response => response.json()
        ).then(
            data => {
                return data.user.userName;
            }
        );
        return res;
    } catch (e) {
        console.log(e);
        return "";
    }
};


export const handleLikeClick = (postId, likecount, setLikecount) => {
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

export const generatePostItems = (posts, handleLikeClick, likecount, rpcount, handleRpClick, handlePostItemClick, onUserClick, myName, s) => {
    return posts.map(post =>
        <li key={post.id} className={s.frame}>
            <div className={s.iconNidNname}>
                <img
                    src={getImage(post.user)}
                    alt={post.user.userName}
                    className={s.icon}
                    onClick={() => onUserClick(post.user.userName, myName)}
                />
                <div>
                    <div className={s.nameNidNconNlike}>
                        <b className={s.userName} onClick={() => onUserClick(post.user.userName)}>{post.user.name}</b>
                        <p className={s.userId}>@{post.user.userName}</p>
                    </div>
                    <p className={s.content} onClick={() => handlePostItemClick(post)}>{post.text}</p>
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
                <span className={s.like} onClick={() => handleLikeClick(post.id)}>♡ {likecount[post.id] || 0} </span>
                <span className={s.repost} onClick={() => handleRpClick(post)}>☆ {rpcount[post.id] || 0} </span>
            </div>
        </li>
    );
};

export const getUserData = async () => {
    try {
        const res = await fetch("http://localhost:3002/users/signin", {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            res => res.json()
        );
        return res.user;
    } catch (e) {
        console.log(e);
        return "";
    }
};
