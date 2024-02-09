import s from "../src/styles/post.module.css"
import {useState, useEffect} from "react";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [myName, setMyName] = useState("");
    const [userName, setUserName] = useState("");
    const [selectedPost, setSelectedPost] = useState(null); //追加

    useEffect(() => {
        fetchData();
        fetchMyName();
    }, []);

    const fetchData = async () => {
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
                    setPosts(data.latestPosts)
                    console.log("ぽすつ：", posts)
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    const fetchMyName = async () => {
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
                    setMyName(data.user.userName)
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    const onUserClick = async (userName) => {
        try {
            setUserName(userName)
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
            }
        } catch (e) {
            console.log(e)
        }
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

    const handlePostItemClick = (post) => {
        // 追加：ポストアイテムをクリックした時の処理
        setSelectedPost(post);
    };

    const postItems = posts.map(post =>
        <li key={post.id} className={s.frame}>
            <div className={s.iconNidNname}>
                <img
                    src={getImage(post.user)}
                    alt={post.user.userName}
                    className={s.icon}
                    onClick={() => onUserClick(post.user.userName)}
                />
                <div>
                    <div className={s.nameNidNconNlike}>
                        <b className={s.userName}>{post.user.name}</b>
                        <p className={s.userId}>@{post.user.userName}</p>
                    </div>
                    <p className={s.content} onClick={() => handlePostItemClick(post)}>{post.text}</p>
                </div>
            </div>
            <div className={s.likeNrp}>
                    <span className={s.like}
                          onClick={() => handleLikeClick(post.id)}>♡ {likecount[post.id] || 0} </span>
                <span className={s.repost}
                      onClick={() => handleRpClick(post.id)}>☆ {rpcount[post.id] || 0} </span>
            </div>

        </li>
    );

    return (
        <>


            <article>
                <ul>{postItems}</ul>
            </article>

            {selectedPost && (
                <div className={s.popup}>
                    <div className={s.popupContent}>
                        <span className={s.close} onClick={() => setSelectedPost(null)}>&times;</span>
                        <div className={s.iconNidNname}>
                            <img
                                src=""
                                alt={selectedPost.user.userName}
                                className={s.selectedIcon}
                            />
                            <div>
                                <div className={s.nameNidNconNlike}>
                                    <b className={s.selectedUserName}>{selectedPost.user.name}</b>
                                    <p className={s.selectedUserId}>@{selectedPost.user.userName}</p>
                                </div>
                                <p className={s.selectedContent}>{selectedPost.text}</p>
                            </div>
                        </div>
                        <div className={s.likeNrp}>
                    <span className={s.selectedLike}
                          onClick={() => handleLikeClick(selectedPost.id)}>♡ {likecount[selectedPost.id] || 0} </span>
                            <span className={s.selectedRepost}
                                  onClick={() => handleRpClick(selectedPost.id)}>☆ {rpcount[selectedPost.id] || 0} </span>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}

export default Post