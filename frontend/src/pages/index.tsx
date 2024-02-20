import React, {useState, useEffect} from "react";
import SignIn from "./SignIn"

const Home = () => {
    const check = async () => {
        try {
            console.dir(location)
            const res = await fetch(`http://${location.hostname}:3002/users/check`, {
                method: 'GET',
                credentials: 'include',
            }).then(
                res => {
                    if (!res.ok) {
                        window.location.href = "/SignIn"
                    } else {
                        window.location.href = "/Home"
                    }
                })
        } catch (e) {
            console.log('error--->', e)
        }
    };

    useEffect(() => {
        check()
    }, []);
  return(
      <>
      </>
  )
}

export default Home