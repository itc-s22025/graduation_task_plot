import { useEffect }  from "react";
import io from 'socket.io-client';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const socket = io();
        return () => {
            socket.disconnect();
        };
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp