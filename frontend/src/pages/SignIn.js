import { useState } from 'react';
import { useRouter } from 'next/router';
import s from '../styles/signIn.module.css';
import Link from 'next/link';

const SignIn = () => {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // バックエンドに認証情報を確認するリクエストを送信
        const response = await fetch('http://localhost:3002/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, password }),
        });

        if (response.status === 200) {
            // 認証情報が正しい場合は/Homeにリダイレクト
            router.push('/Home');
        } else {
            // 認証失敗時の処理、エラーメッセージの表示など
            console.error('Authentication failed');
        }
    };

    return (
        <>
            <main className={s.all}>
                <img src="/orangelogo.png" className={s.image}/>
                <div className={s.boxLarge}>
                    <h1 className={s.SignIn}>SignIn</h1>

                    <form onSubmit={handleSubmit}>
                        <p>
                            <input
                                type="text"
                                placeholder="User ID"
                                className={s.box}
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </p>
                        <p>
                            <input
                                type="password"
                                minLength="4"
                                placeholder="Password"
                                required
                                className={s.box}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </p>
                        <p>
                            <input type="submit" value="SIGN IN" className={s.signin} />
                        </p>
                    </form>
                </div>
                <div className={s.or}>
                    <p>OR</p>
                </div>
                <div className={s.boxLarge}>
                    <Link href="/SignUp">
                        <p>
                            <input type="submit" value="SIGN UP" className={s.signup} />
                        </p>
                    </Link>
                </div>
            </main>
        </>
    );
};

export default SignIn;
