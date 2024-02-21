import s from "../src/styles/post.module.css"
import {useState, useEffect} from "react";
import {fetchAllPosts, fetchMyName, onUserClick, handleLikeClick, generatePostItems} from "./utils.js";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [myName, setMyName] = useState("");
    const [selectedPost, setSelectedPost] = useState(null); //追加
    const [hasMenu, setHasMenu] = useState(null) //メニューあれば
    const [likecount, setLikecount] = useState({});
    const [rpcount, setRpcount] = useState({});

    useEffect(() => {
        fetchAllPosts().then(data => {
            setPosts(data)
        });
        fetchMyName().then(name => {
            setMyName(name)
        });
    }, []);

    const handleLikeClickWrapper = async (postId) => {
        await handleLikeClick(postId, likecount, setLikecount);
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

    const handleHasMenu = (menu) => {
        setHasMenu(menu)
    }

    const postItems = generatePostItems(posts, handleLikeClickWrapper, likecount, rpcount, handleRpClick, handlePostItemClick, onUserClick, myName, s);

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
                                src="/フリーアイコン.png"
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
                                  onClick={() => handleLikeClickWrapper(selectedPost.id)}>♡ {likecount[selectedPost.id] || 0} </span>
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