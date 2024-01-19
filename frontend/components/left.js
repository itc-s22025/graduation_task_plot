import s from "../src/styles/left.module.css";
import Link from "next/link";

const Nav = () => {
    return (
        <nav className={s.bg}>
            <ul>
                <li className={s.box}>
                    <img src="img/homeIcon.png"
                           alt="icon"
                           width={38}
                           height={38}
                           // objectFit="cover"
                           className={s.icon}/>

                    <Link href="../src/pages/Home.js" legacyBehavior>
                        <a>Home</a>
                    </Link>
                </li>

                <li className={s.box}>
                    <img src="img/resumeIcon.png"
                           alt="icon"
                           // whttps://github.com/itc-s22025/graduation_task_plot.gitidth={38}
                           height={38}
                           width={38}
                           // objectFit="cover"
                           className={s.icon}/>

                    <Link href="../src/pages/Profile.js" legacyBehavior>
                        <a>Profile</a>
                    </Link>
                </li>

                <li className={s.box}>
                    <img src="img/notification.png"
                           alt="icon"
                           width={38}
                           height={38}
                           // objectFit="cover"
                           className={s.icon}/>

                    <Link href="/" legacyBehavior>
                        <a>Notifications</a>
                    </Link>
                </li>

                <li className={s.box}>
                    <img src="img/settingIcon.png"
                           alt="icon"
                           width={38}
                           height={38}
                           // objectFit="cover"
                           className={s.icon}/>

                    <Link href="/" legacyBehavior>
                        <a>Setting</a>
                    </Link>
                </li>

                <li className={s.box}>
                    <img src="img/keepIcon.png"
                           alt="icon"
                           width={38}
                           height={38}
                           // objectFit="cover"
                           className={s.icon}/>

                    <Link href="/" legacyBehavior>
                        <a>Keep</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav


