import {useEffect, useState} from "react";
import s from "../../styles/accountInfo.module.css"
import Header from "../../../components/header";
import FrameLayout from "../../../components/frameLayout";

const Info = () => {
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [gender, setGender] = useState("")
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3002/users/signin").then(
            res => res.json()
        ).then(
            data => {
                console.log(data[0].name)
                setName(data[0].name)
                setUserName(data[0].userName)
                setGender(data[0].gender)
                if (data[0].filter === false){
                    setFilter("適応しない")
                }else {
                    setFilter("適応する")
                }
            }
        )
    }, []);

    return(
        <>
            <Header title="Account Information" />
            <FrameLayout />
            <div className={s.all}>
                <h1>{name}'s Information</h1>
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
            </div>
        </>
    )
}
export default Info