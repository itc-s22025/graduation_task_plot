import Nav from "./left";
import Right from "./right";
import Header from "./header";
import Logo from "./logo";
import Main from "./center";

const FrameLayout = ({center}) => {
    return(
        <>
            <Nav />
            {center}
            <Right />
            <Logo />
        </>

    )
}
export default FrameLayout