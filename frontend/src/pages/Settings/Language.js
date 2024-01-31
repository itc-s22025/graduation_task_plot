import Header from "../../../components/header";
import FrameLayout from "../../../components/frameLayout";
import s from "../../styles/accountInfo.module.css";

const Language = () => {
    return(
        <>
            <Header title="Change Password" />
            <FrameLayout />
            <div className={s.all}>
                <h1>Languages</h1>
            </div>
        </>
    )
}

export default Language