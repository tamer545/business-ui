import * as React from "react";
import {useEffect, useState} from "react";
import firebase from "firebase/compat";
import {Container, TextField} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export default function Registration(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const [firstPw, setFirstPw] = useState('')

    function storeUser() {
        props.setUser(username)
        firebase.database().ref('users/' + username + '/security/password').set(password)
    }

    async function getUsername() {
        const snap = await firebase.database().ref('users/' + username).get();
        if (snap.val()) {
            console.log(snap.val())
            return true;
        }
        return false
    }

    async function validate() {
        const isUserAlreadyUsed = await getUsername();

        if (!isUserAlreadyUsed) {
            if (firstPw === password) {
                if (username.length > 1) {
                    if (firstPw !== '' && password !== '') {
                        storeUser()
                        navigate('/login')
                    }else{
                        setErrorMessage("Password too short")
                    }
                } else {
                    setErrorMessage("Username too short")
                }
            } else {
                setErrorMessage("Passwords do not match")
            }
        } else {
            setErrorMessage("User is already in use")
        }
    }

    useEffect(() => {
        props.setRows([])
    }, [])

    return (
        <Container>
            <TextField
                error={errorMessage !== ''}
                sx={{width: '600px'}}
                value={username}
                placeholder={"Benutzer Name"}
                onChange={e => setUsername(e.target.value)}
                helperText={errorMessage}
            />
            <TextField
                sx={{width: '600px'}}
                value={firstPw}
                type={"password"}
                placeholder={"Password"}
                onChange={e => setFirstPw(e.target.value)}
            />
            <TextField
                sx={{width: '600px'}}
                value={password}
                type={"password"}
                placeholder={"Confirm Password"}
                onChange={e => setPassword(e.target.value)}
            />
            <br/>
            <Button variant={"contained"} onClick={() => validate()}>Registrieren</Button>
            <div>Du hast bereits einen Account? Melde dich <NavLink to={'/login'}>hier</NavLink> an</div>
        </Container>
    );
}