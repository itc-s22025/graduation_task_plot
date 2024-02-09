import Post from "../../components/post"
import {useState, useEffect} from "react";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";
import s from "../../src/styles/center.module.css"
import {useRouter} from 'next/router.js';
import {Link} from 'react-router-dom';

const Home = () => {
    const [people, setPeople] = useState([])
    const [user, setUser] = useState([])
    const router = useRouter();

    const handleProfileClick = (username) => {
        router.push('./Profile/${username}');
    };

    return (
        <>
            <Header title="HOME" />
            <FrameLayout center={<Post/>}/>
            {people.map(person => (
                <li key={person.id}>
                    {/* ユーザーアイコンをクリックすると、ユーザープロフィールページに遷移 */}
                    <img src={person.icon} alt={person.username} onClick={() => handleProfileClick(person.username)} />
                </li>
            ))}
        </>
    );
};

export default Home