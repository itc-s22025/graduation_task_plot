import s from "../styles/notifications.module.css"
import React from "react";
import FrameLayout from "../../components/frameLayout.js";
import Header from "../../components/header";

function Notifications() {
    return (
        <>
            <Header title=" Notifications" />
        <FrameLayout />
        <div className={s.all}>
            <div className={s.heartbox}>
                <img src='/images/heart.png' className={s.heart} />
                <p className={s.hearttext}>さんがあなたのポストにいいねしました</p>
                <div className={s.userbox}>
                    <img src='/images/user.png' className={s.user} />
                    <p className={s.usertext}>さんがあなたをフォローしました</p>
                </div>
                <div className={s.retweetbox}>
                    <img src='/images/retweet.png' className={s.retweet} />
                    <p className={s.retweettext}>さんがあなたのポストをリツイートしました</p>
                </div>
        </div>
        </div>
        </>
    )
}

export default Notifications