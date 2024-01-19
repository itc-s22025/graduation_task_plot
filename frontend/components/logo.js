import s from '../src/styles/logo.module.css'

const Logo = () => {
    return (
        <>
            <div className={s.bg}>
                <p className={s.pl}>＋</p>
                <img src="img/Mascle.png"
                      alt="icon"
                       height={35}
                       width={35}
                       className={s.icon}/>
            </div>
        </>
    )
}
export default Logo
