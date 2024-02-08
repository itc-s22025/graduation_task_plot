import Bio from "../../components/bio";
import BioBar from "../../components/biobar";
import FrameLayout from "../../components/frameLayout";
import Header from "../../components/header";
import Edit from "./edit.js"
const Profile = () => {
    // const handleSave = (data) => {
    //     console.log("保存するデータ:", data);
    // };

    return(
        <>
            <Header title="Profile"/>
            <FrameLayout />

                <div>
                    {/*<Edit onSave={handleSave}/>*/}
                <Bio/>
                <BioBar/>
                </div>
            )

        </>
    )
}

export default Profile