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
                    if (filter === false){
                        setFilter("適応しない")
                    }else {
                        setFilter("適応する")
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }


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
                <input type="submit" value="LOGOUT" className={s.logout}/>
            </div>
        </>
    )
}
export default Info