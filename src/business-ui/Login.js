import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase/compat";

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [pwFromDatabase, setPwFromDatabase] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();

    function onLogin() {
        findPassword()
    }

    useEffect(() => {
        if (password !== '' || pwFromDatabase !== '') {
            if (password === pwFromDatabase) {
                setErrorMessage("")
                navigate("/business")
                props.setUser(username)
            } else {
                setErrorMessage("Incorrect password")

            }
        }
    }, [pwFromDatabase])

    function findPassword() {
        // on() method
        firebase.database().ref('users/' + username + '/security').on('value', (snap) => {
            if (snap.val()) {
                console.log("snap.val()", snap.val())
                setPwFromDatabase(snap.val().password)
            } else {
                setErrorMessage("Incorrect Username")

            }
        });
    }

    return (
        <div>
            <TextField
                sx={{width: '600px'}}
                value={username}
                placeholder={"Benutzer Name"}
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                sx={{width: '600px'}}
                value={password}
                type={"password"}
                placeholder={"Password"}
                onChange={e => setPassword(e.target.value)}
            />
                <Button variant={"contained"} onClick={() => onLogin()}>Login</Button>
        </div>
    );

}