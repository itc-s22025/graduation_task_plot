import Post from "../../components/post"
import {useState, useEffect} from "react";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";
import s from "../../src/styles/center.module.css"

const Home = () => {

    const check = async () => {
        try {
            const res = await fetch("http://localhost:3002/users/check", {
                method: 'GET',
                credentials: 'include',
            }).then(
                res => {
                    if (!res.ok) {
                        window.location.href = "/SignIn"
                    }
                })
        } catch (e) {
            console.log('error--->', e)
        }
    };

    useEffect(() => {
        check()
    }, []);

    return (
        <>
            <Header title="HOME" />
            <FrameLayout center={<Post/>}/>
        </>
    )
}

export default Home