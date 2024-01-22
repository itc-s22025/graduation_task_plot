import {useEffect, useState} from "react";
import s from "../../styles/accountInfo.module.css"
import Header from "../../../components/header";
import FrameLayout from "../../../components/frameLayout";

const Info = () => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")

    useEffect(() => {
        fetch("http://localhost:3002/api/signin").then(
            res => res.json()
        ).then(
            data => {
                console.log(data[1].name)
                setName(data[1].name)
                setUsername(data[1].username)
                setGender(data[1].gender)
            }
        )
    }, []);

    return(
        <>
            <Header title="Account Information" />
            <FrameLayout />
            <div className={s.all}>
                <h1>Account Information</h1>
                <div className={s.frame}>
                    <div className={s.box}>
                        <p className={s.each}><b>name:</b></p>
                        <input type="text" name="name" value={name} className={s.input}/>
                    </div>
                    <p className={s.each}><b>user ID:</b> @{username}</p>
                    <p className={s.each}><b>gender:</b> {gender}</p>
                </div>
            </div>
        </>
    )
}
export default Info