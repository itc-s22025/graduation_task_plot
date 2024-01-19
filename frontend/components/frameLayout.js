import Nav from "./left";
import Right from "./right";
import Header from "./header";
import Logo from "./logo";
import Main from "./center";
// import Scrollbar from "./scrollbar";

const FrameLayout = ({center}) => {
    return(
        <>
            <Nav />
            {center}
            <Right />
            <Logo />
            {/*<Scrollbar />*/}
        </>

    )
}
export default FrameLayout