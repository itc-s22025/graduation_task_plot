import axios from 'axios';
import Bio from "../../../components/bio.js";
import BioBar from "../../../components/biobar.js";
import FrameLayout from "../../../components/frameLayout.js";
import Header from "../../../components/header.js";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://${location.hostname}:3002/users/signin`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = response.data;
                // setUser(data.user);
                console.log("data->", data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
    }, []);


    return (
        <>
            <Header title="Profile"/>
            <FrameLayout></FrameLayout>

            <div>
                <Bio />
                <BioBar/>
            </div>
        </>
    );
}

export default Index;
