import {useEffect, useState} from "react";
import s from "../../styles/accountInfo.module.css"
import Header from "../../../components/header";
import FrameLayout from "../../../components/frameLayout";
import axios from "axios";
import {getUserData} from "../../../components/utils.js";

const Info = () => {
    const [user, setUser] = useState([])
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [gender, setGender] = useState("")
    const [filter, setFilter] = useState(true)

    useEffect(() => {
        getUserData().then(
            data => {
                console.log(data)
                setUser(data)
                setName(data.name)
                setUserName(data.userName)
                setGender(data.gender)
                setFilter(data.filter === true)
            }
        )
    }, []);


    const handleLogout = async () => {
        try {
            const res = await fetch(`http://${location.hostname}:3002/users/logout`, {
                method: 'POST',
                credentials: 'include',
            }).then(
                res => {
                    if (!res.ok) {
                        window.location.href = "/"
                    } else {
                        throw new Error('ログアウト失敗した...')
                    }
                })
        } catch (e) {
            console.log('error--->', e)
        }
    };


    return (
        <>
            <Header title="Account Information"/>
            <FrameLayout/>

            <div className={s.all}>
                <h1>{name} 's Information</h1>
                <div className={s.frame}>
                    <div className={s.box}>
                        <p className={s.each}><b>name:</b></p>
                        <input type="text" name="name" defaultValue={name} className={s.input}/>
                    </div>
                    <div className={s.box}>
                        <p className={s.each}><b>user ID:</b> @</p>
                        <input type="text" name="username" defaultValue={userName} className={s.input}/>
                    </div>
                    <div className={s.box}>
                        <p className={s.each}><b>gender:</b></p>
                        <input type="text" name="gender" defaultValue={gender} className={s.input}/>
                    </div>
                    <div className={s.box}>
                        <p className={s.each}><b>filter:</b></p>
                        <input type="text" name="filter" value={filter ? "Apply" : "Remove"}
                               className={s.input}/>
                    </div>
                </div>
                <input type="submit" value="SAVE" className={s.save}/>
                <button className={s.logout} onClick={handleLogout}>LOGOUT</button>
            </div>
        </>
    )
}
export default Info