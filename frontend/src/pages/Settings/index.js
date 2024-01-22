import Header from "../../../components/header";
import FrameLayout from "../../../components/frameLayout";
import s from '../../styles/setting.module.css'
import Link from "next/link";

const Settings = () => {
    return (
        <>
            <Header title="Settings"/>
            <FrameLayout/>
            <ul className={s.ul}>
                <Link href="/Settings/Info" className={s.box}>
                    <img src="" alt="i" className={s.img}/>
                    Account Information
                </Link>
                <Link href="/Settings/ChangePwd" className={s.box}>
                    <img src="" alt="i" className={s.img}/>
                    Change Password
                </Link>
                <Link href="/Settings/Language" className={s.box}>
                    <img src="" alt="i" className={s.img}/>
                    Languages
                </Link>
            </ul>
        </>
    )
}

export default Settings