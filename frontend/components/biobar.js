import s from '../src/styles/biobar.module.css'

const BioBar = () => {
    return(
        <>
            <div className={s.all}>
                <p>POST</p>
                <p>MEDIA</p>
                <p>LIKES</p>
            </div>
        </>
    )
}

export default BioBar