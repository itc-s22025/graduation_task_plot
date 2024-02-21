import { useState } from 'react';
import { useRouter } from 'next/router';
import s from '../styles/signIn.module.css';
import Link from 'next/link';
import axios from 'axios';

const SignIn = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`http://${location.hostname}:3002/users/signin`, {
                userName, password
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                console.log("ろぐいんできた!!!!!!!!");
                router.push("/Home");
            } else {
                console.log("できなかった........");

            }
        } catch (e) {
            console.error("ERRORRRRRRR:::: ", e);
        }
    };

    return (
        <>
            <main className={s.all}>
                <img src="/orangelogo.png" className={s.image}/>
                <div className={s.boxLarge}>
                    <h1 className={s.SignIn}>SignIn</h1>

                    <input
                        type="text"
                        placeholder="User ID"
                        className={s.box}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="password"
                        minLength="4"
                        placeholder="Password"
                        required
                        className={s.box}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="SIGN IN" onClick={handleSubmit} className={s.signin}/>

                </div>
                <div className={s.or}>
                    <p>OR</p>
                </div>
                <div className={s.boxLarge}>
                    <Link href="/SignUp">
                        <p>

                            <input type="submit" value="SIGN UP" className={s.signup}/>

                        </p>
                    </Link>
                </div>
            </main>
        </>
    );
};

export default SignIn;
