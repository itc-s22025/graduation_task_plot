import Post from "../../components/post"
import {useState, useEffect} from "react";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";
import s from "../../src/styles/center.module.css"

const Home = () => {


    return (
        <>
            <Header title="HOME" />
            <FrameLayout center={<Post/>}/>
        </>
    )
}

export default Home