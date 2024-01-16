import {people} from "./data";
import s from "../src/styles/bio.module.css";
import {getImageUrl} from "./utils";

const Bio = () => {

    return(
        <>

            <div className={s.frame}>
                <div className={s.iconNidNname}>
                    <div className={s.icon}></div>

                    <div>
                        <div className={s.nameNidNfosNfollow}>
                            <div className={s.nameNidNfos}>
                                <div className={s.nameNid}>
                                    <p className={s.userName}><b>USERNAME</b></p>
                                    <p className={s.userId}>@userId</p>
                                </div>
                                <div className={s.foNwer}>
                                    <p>12 Following</p>
                                    <p className={s.follower}>34 Follower</p>
                                </div>
                            </div>
                            <p className={s.follow}> Follow</p>
                        </div>
                        <p className={s.content}>text text text</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Bio