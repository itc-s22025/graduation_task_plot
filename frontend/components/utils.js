import {useEffect, useState} from "react";

export function getImageUrl(person) {
    return (
        'https://i.imgur.com/' +
        person.imageId +
        's.jpg'
    );
}

export const getProf = async (userName) => {
    const [user, setUser] = useState("")
    try {
        const res = await fetch(`http://localhost:3002/users/${userName}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log("UTIL:DATA--->", data.user)
                setUser(data.user)
            }
        )
    } catch (e) {
        console.error(e)
    }

    return(
        user
    )
}