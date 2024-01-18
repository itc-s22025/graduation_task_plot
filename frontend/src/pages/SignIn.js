import s from '../styles/signIn.module.css'
import Link from 'next/link'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const SignIn = () => {
    const router = useRouter();
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, password }),
            });

            if (response.ok) {
                // 認証が成功した場合、Home.jsにリダイレクト
                router.push('/Home');
            } else {
                const data = await response.json();
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return(
        <>
            <main className={s.all}>
                <div className={s.boxLarge}>
                    <h1 className={s.SignIn}>SignIn</h1>

                    <p><input type="text" placeholder= "User ID" value={id} onChange={(e) => setId(e.target.value)} className={s.box}/></p>
                    <p><input type="password" minLength="8" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className={s.box}/></p>
                    <p><input type="submit" value="SIGN IN" onClick={handleSignIn} className={s.signin} /></p>

                </div>
                <div className={s.or}>
                    <p>{id}</p>
                    <p>{password}</p>
                    <p>OR</p>
                </div>
                <div className={s.boxLarge}>
                    <Link href="/SignUp">
                        <p><input type="submit" value="SIGN UP" className={s.signup} /></p>
                    </Link>
                </div>
            </main>
        </>
    )
}

export default SignIn