import Bio from "../../components/bio";
import BioBar from "../../components/biobar";
import Post from "../../components/post";
import s from "../styles/profile.module.css"
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";


const Profile = () => {
    return(
        <>
            <Header title="Profile"/>
            <FrameLayout />
            <div>
                <Bio />
                <BioBar />
            </div>
        </>
    )
}

export default Profile