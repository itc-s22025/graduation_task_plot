import s from '../src/styles/biobar.module.css'

const BioBar = () => {


    return(
        <>
            <div className={s.all}>
                <p className={s.box}>POST</p>
                <p className={s.box}>MEDIA</p>
                <p className={s.box}>LIKES</p>
            </div>
        </>
    )
}

export default BioBar