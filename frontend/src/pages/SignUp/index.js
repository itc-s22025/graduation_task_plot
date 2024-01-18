import s from '../../styles/signUp.module.css'
import Link from 'next/link'

const Index = () => {
    return(
        <>
            <main className={s.all}>
                <img src="/fitchatlogo.png" className={s.image}/>
                <div className={s.boxLarge}>
                    <h1 className={s.signUp}>SignUp</h1>
                    <p><input type="text" placeholder="User ID" className={s.box}/></p>
                    <p><input type="password" minLength="8" placeholder="Password" required className={s.box}/></p>

                    <Link href="/SignUp/Detail">
                        <p><input type="submit" value="NEXT" className={s.next} /></p>
                    </Link>


                </div>
            </main>
        </>
    )
}

export default Index