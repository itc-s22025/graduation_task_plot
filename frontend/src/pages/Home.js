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

    useEffect(() => {
        fetch("http://localhost:3002/api/user").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                setUser(data.user)
            }
        )
    })


    return (
        <>
            <h1>HOME</h1>
            <p>
            {people.map((person, index) => (
                <div key={index}>
                    {person}
                </div>
            ))}
            </p>
            <p>
                {user.map((id, name, imageId) => {
                    <div key={id}>
                        {name}
                    </div>
                })}
            </p>
            <Post/>
        </>
    )
}

export default Home