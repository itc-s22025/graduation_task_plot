import Router from 'next/router'
import axios from 'axios';

export const getImage = (data) => {
    return ('https://i.imgur.com/' + data + 's.jpg');
}

export const onUserClick = async (userName, myName) => {
    try {
        const res = await axios.get(`http://${location.hostname}:3002/users/${userName}`, {
            withCredentials: true
        });
        const data = res.data;
        console.log(data);

        if (userName === myName) {
            window.location.href = '/Profile';
        } else {
            console.log(userName);
            Router.push({
                pathname: '/Other',
                query: { userName },
            }, { shallow: true });
        }
    } catch (e) {
        console.log(e);
    }
};

export const fetchAllPosts = async () => {
    try {
        const res = await axios.get(`http://${location.hostname}:3002/posts/all`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = res.data;
        console.log("DATA", data);
        return data.latestPosts;
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const fetchMyName = async () => {
    try {
        const res = await axios.get(`http://${location.hostname}:3002/users/signin`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = res.data;
        return data.user.userName;
    } catch (e) {
        console.log(e);
        return "";
    }
};

export const handleLikeClick = async (postId, likecount, setLikecount) => {
    try {
        const response = await axios.post(`http://${location.hostname}:3002/posts/like`, {
            postId: postId
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!likecount[postId] || likecount[postId] === 0) {
            setLikecount((prevCounts) => ({
                ...prevCounts,
                [postId]: (prevCounts[postId] || 0) + 1
            }));
        } else {
            setLikecount((prevCounts) => ({
                ...prevCounts,
                [postId]: prevCounts[postId] - 1,
            }));
        }

        const data = response.data;
        console.log(data.message);
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getLikeCount = async (postId) => {
    try {
        const response = await axios.get(`http://${location.hostname}:3002/posts/like/all`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export const generatePostItems = (posts, handleLikeClick, likecount, rpcount, handleRpClick, handlePostItemClick, onUserClick, myName, s) => {
    return posts.map(post =>
        <li key={post.id} className={s.frame}>
            <div className={s.iconNidNname}>
                <img
                    src="/フリーアイコン.png"
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
        const res = await axios.get(`http://${location.hostname}:3002/users/signin`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = res.data;
        return data.user;
    } catch (e) {
        console.log(e);
        return "";
    }
};
