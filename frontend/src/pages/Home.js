import Post from "../../components/post"
import {useState, useEffect} from "react";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";
import s from "../../src/styles/center.module.css"

const Home = () => {
    const [people, setPeople] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        fetch("http://localhost:3002/api/home").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                setPeople(data.people)
            }
        )
    }, [])

    // useEffect(() => {
    //     fetch("http://localhost:3002/api/signin").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             console.log(data[0])
    //             setUser(data.id)
    //         }
    //     )
    // }, []);


    return (
        <>
            <Header title="HOME" />
            <FrameLayout center={<Post/>}/>
            {/*<ul>*/}
            {/*{people.map((person, index) => (*/}
            {/*    <li key={index}>*/}
            {/*        {person}*/}
            {/*    </li>*/}
            {/*))}*/}
            {/*</ul>*/}
            {/*<div className={s.box}>*/}
            {/*<Post/>*/}
            {/*</div>*/}
        </>
    )
}

export default Home