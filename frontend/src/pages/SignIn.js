import s from '../styles/signIn.module.css'
import Link from 'next/link'

const SignIn = () => {
    return(
        <>
            <main className={s.all}>
                <div className={s.boxLarge}>
                    <h1 className={s.SignIn}>SignIn</h1>
                    <p><input type="text" placeholder= "User ID" className={s.box}/></p>
                    <p><input type="password" minLength="8" placeholder="Password" required className={s.box}/></p>
                    <Link href="/Home">
                        <p><input type="submit" value="SIGN IN" className={s.signin} /></p>
                    </Link>
                </div>
                <div className={s.or}>
                    <p></p>
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