import s from "../src/styles/post.module.css"
import {useState, useEffect} from "react";
import {fetchMyName, getImage, onUserClick, handleLikeClick} from "./utils.js";


const FemalePost = () => {
    const [posts, setPosts] = useState([]);
    const [myName, setMyName] = useState("");
    const [selectedPost, setSelectedPost] = useState(null); //追加
    const [likecount, setLikecount] = useState({});
    const [rpcount, setRpcount] = useState({});

    useEffect(() => {
        fetchFemalePosts();
        fetchMyName().then(name => {
            setMyName(name)
        });
    }, []);

    const fetchFemalePosts = async () => {
        try {
            const res = await fetch(`http://${location.hostname}:3002/posts/female`, {
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
                    setPosts(data.FemaleUsersPosts)
                }
            )
        } catch (e) {
            console.log(e)
        }
    }


    const handleLikeClickWrapper = (postId) => {
        handleLikeClick(postId, likecount, setLikecount);
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
        setSelectedPost(post);
    };

    const postItems = posts.map(post =>
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
                    <span className={s.like}
                          onClick={() => handleLikeClickWrapper(post.id)}>♡ {likecount[post.id] || 0} </span>
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
                                {selectedPost.menu && (
                                    <div className={s.dumbbell}>
                                        <p className={s.menu}>{selectedPost.menu}</p>
                                        {selectedPost.time && (
                                            <div className={s.timeNtimeUnit}>
                                                <p className={s.time}>{selectedPost.time}</p>
                                                <p className={s.timeUnit}>{selectedPost.timeUnit}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
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

export default FemalePost