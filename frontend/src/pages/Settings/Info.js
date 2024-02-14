import {useEffect, useState} from "react";
import s from "../../styles/accountInfo.module.css"
import Header from "../../../components/header";
import FrameLayout from "../../../components/frameLayout";

const Info = () => {
    const [info, setInfo] = useState([])
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [gender, setGender] = useState("")
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        main()
    }, []);

    const main = async () => {
        try {
            fetch("http://localhost:3002/users/signin", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(
                    res => res.json()
                ).then(
                data => {
                    console.log(data)
                    // setInfo(data)
                    setName(data.user.name)
                    setUserName(data.user.userName)
                    setGender(data.user.gender)
                    setFilter(data.user.filter)
                    // if (filter === true){
                    //     setFilter("適応する")
                    // }else {
                    //     setFilter("適応しない")
                    // }
                })
        } catch (e) {
            console.log(e)
        }
    }

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:3002/users/logout", {
                method: 'POST',
                credentials: 'include',
            }).then(
                res => {
                    if (!res.ok) {
                        window.location.href = "/"
                    } else {
                        throw new Error('ログアウト失敗した...')
                        console.log(res)
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
                        <input type="text" name="name" value={name} className={s.input}/>
                    </div>
                    <div className={s.box}>
                        <p className={s.each}><b>user ID:</b>　　　@</p>
                        <input type="text" name="username" value={userName} className={s.input}/>
                    </div>
                    <div className={s.box}>
                        <p className={s.each}><b>gender:</b></p>
                        <input type="text" name="gender" value={gender} className={s.input}/>
                    </div>
                    <div className={s.box}>
                        <p className={s.each}><b>filter:</b></p>
                        <input type="text" name="gender" value={filter} className={s.input}/>
                    </div>
                </div>
                <input type="submit" value="SAVE" className={s.save}/>
                <button className={s.logout} onClick={handleLogout}>LOGOUT</button>
            </div>
        </>
    )
}
export default Info