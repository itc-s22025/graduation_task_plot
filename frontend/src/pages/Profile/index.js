import Bio from "../../../components/bio.js";
import BioBar from "../../../components/biobar.js";
import FrameLayout from "../../../components/frameLayout.js";
import Header from "../../../components/header.js";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const Index = () => {
    const router = useRouter();
    // const [user, setUser] = useState(null);

    let user = null;

    if (typeof window !== 'undefined') {
        const {user: userData} = router.query;
        user = userData? JSON.parse(userData) : null;
    }
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("http://localhost:3002/api/user", {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await res.json();
                setUser(data.user);
            } catch (e) {
                console.error(e);
            }
        };
        fetchUserData();
    }, []);


    return(
        <>
            <Header title="Profile"/>
            <FrameLayout></FrameLayout>

                <div>
                <Bio user={user}/>
                <BioBar/>
                </div>
            )

        </>
    )
}

export default Index