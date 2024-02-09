import s from '../src/styles/logo.module.css'
import Link from "next/link";

const Logo = () => {
    return (
        <>
            <Link href="/Post" className={s.bg}>
                <p className={s.pl}>＋</p>
                <img src="/Mascle.png"
                      alt="icon"
                       height={35}
                       width={35}
                       className={s.icon}/>
            </Link>
        </>
    )
}
export default Logo
