import Post from "../../components/post"
import {useState, useEffect} from "react";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";
import {hidden} from "next/dist/lib/picocolors";
import scrollbar from "../../components/scrollbar";

const Home = () => {
    const [people, setPeople] = useState([])
    const [user, setUser] = useState([])


    useEffect(() => {
        fetch("http://localhost:3000/api/home").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                setPeople(data.people)
            }
        )
    }, [])

    useEffect(() => {
        const handleScrollBoxWidth =() => {
            const scrollBox = document.getElementById("srollBox");
            if (scrollBox) {
                const scrollBar = scrollBox.offsetWidth - scrollBox.clientWidth;
                scrollBox.style.width = `calc(100% + ${scrollBar}px)`;

            }
        };

        handleScrollBoxWidth();
        window.addEventListener("resize", handleScrollBoxWidth);
        return () => {
        window.removeEventListener("resize", handleScrollBoxWidth);
        };
    }, []);

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
            {/*<Post/>*/}
        </>
    )
}

export default Home