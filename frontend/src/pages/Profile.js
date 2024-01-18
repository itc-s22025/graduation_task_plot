import Bio from "../../components/bio";
import BioBar from "../../components/biobar";
import Post from "../../components/post";
import s from "../styles/profile.module.css"


const Profile = () => {
    return(
        <>
            <div className={s.all}>
                <Bio />
                <BioBar />
                <Post />
            </div>
        </>
    )
}

export default Profile