import s from '../../styles/signUp.module.css'
import {useRouter} from "next/router";
import {useState} from "react";

const Index = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleNextClick = () => {
        router.push({
                pathname: '/SignUp/Detail',
                query: {userName, password},
            },
            undefined,
            {shallow: true});
    };

    return (
        <>
            <main className={s.all}>
                <img src="/fitchatlogo.png" className={s.image}/>
                <div className={s.boxLarge}>
                    <h1 className={s.signUp}>SignUp</h1>
                    <div>
                        <input type="text" name="userid" placeholder="User ID" value={userName}
                               onChange={(ev) => setUserName(ev.target.value)} className={s.box}/>
                    </div>
                    <div>
                        <input type="password" name="password" minLength="6" placeholder="password" value={password} required
                               onChange={(ev) => setPassword(ev.target.value)} className={s.box}/>
                    </div>

                    <input type="submit" value="NEXT" onClick={handleNextClick} className={s.next}/>

                </div>
            </main>
        </>
    )
}

export default Index