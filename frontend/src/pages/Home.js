import Post from "../../components/post"
import {useState, useEffect} from "react";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";
import FemalePost from "../../components/femalePost.js";
import MalePost from "../../components/malePost.js";

const Home = () => {
    const [displayPost, setDisplayPost] = useState(false);
    const [displayMalePost, setDisplayMalePost] = useState(false);
    const [displayFemalePost, setDisplayFemalePost] = useState(false);

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

    const filterCheck = async () => {
        try {
            const res = await fetch("http://localhost:3002/users/signin", {
                method: "GET",
                credentials: "include",
            }).then(
                res => res.json()
            ).then(
                data => {
                    console.log("HOMEDATA--->", data)
                    if (data.user.filter === false){
                        console.log("SHOW ALL POSTS")
                        setDisplayPost(true)
                    }if (data.user.gender === "Male" && data.user.filter === true){
                        console.log("MALE FILTER")
                        setDisplayMalePost(true)
                    }if (data.user.gender === "Female" && data.user.filter === true){
                        console.log("FEMALE FILTER")
                        setDisplayFemalePost(true)
                    }else {
                        console.log("NOT FEMALE FILTER")
                    }
                }
            )
        }catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        check()
        filterCheck()
    }, []);


    return (
        <>
            <Header title="HOME" />
            <FrameLayout />
            {displayPost && <Post/>}
            {displayMalePost && <MalePost/>}
            {displayFemalePost && <FemalePost/>}
            {/*<Post />*/}
        </>
    );
};

export default Home