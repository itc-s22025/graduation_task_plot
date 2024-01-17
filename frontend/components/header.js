import s from '../src/styles/header.module.css'

export default function Header({title}) {
    return (
        <div className={s.bg}>
            <a className={s.yajirushi}>←</a>

            <h1 className={s.text}>{title}</h1>

        </div>
    )
}
