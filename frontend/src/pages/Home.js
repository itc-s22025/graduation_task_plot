import Post from "../../components/post"
import {useState, useEffect} from "react";

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
            <h1>HOME</h1>
            <ul>
            {people.map((person, index) => (
                <li key={index}>
                    {person}
                </li>
            ))}
            </ul>
            <Post/>
        </>
    )
}

export default Home