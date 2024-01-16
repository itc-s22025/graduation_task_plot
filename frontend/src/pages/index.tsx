import React, {useState, useEffect} from "react";
import SignIn from "./SignIn"

const Home = () => {
  const [message, setMessage] = useState("Loading...")

    useEffect(() => {
        fetch("http://localhost:3002/api/data").then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                setMessage(data.message)
            }
        )
    }, [])
  return(
      <>
        <h1>{message}</h1>
          <SignIn />
      </>
  )
}

export default Home