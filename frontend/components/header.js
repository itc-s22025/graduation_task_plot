import s from '../src/styles/header.module.css'
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Header({title}) {

    const router = useRouter();

    useEffect(() => {
        let initialLoad = true;
        const handleNavigation = () => {
            // 特定の条件を満たすかどうかを直接判断せず、
            // そのままブラウザの戻る機能を呼び出す
            if (initialLoad) {
                initialLoad = false;
                return;

            }
            router.back();
        };

        window.addEventListener('popstate', handleNavigation);

        return () => {
            window.removeEventListener('popstate', handleNavigation);
        };
    }, [router]);

    return (
        <div className={s.bg}>
            <h1 className={s.text}>{title}</h1>
            <div className={s.yajirushi} onClick={() => router.back()}>
                <span>←</span>
            </div>
        </div>
    )
}
