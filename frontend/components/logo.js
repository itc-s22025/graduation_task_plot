import s from '../src/styles/logo.module.css'
import {Post}  from "../src/pages/Post.js";
import React from 'react';
import Link from "next/link"

const Logo = () => {
    const handleClick = () => {
        console.log('Mascle Clicked')
    }
    return (
        <>
            <div className={s.bg}>
                <Link href={"/Post"}>
                <p className={s.pl}>＋</p>
                <img src="/Mascle.png"
                      alt="icon"
                       height={35}
                       width={35}
                       className={s.icon}
                        onClick={() => handleClick()}/>
                </Link>
            </div>

        </>
    )
}
export default Logo
