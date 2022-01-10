import {useState} from "react";

export default function Registration() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState("")

    function storeUser() {
        //     firebase.database().ref('usernames/' + username + '/security/password').set(password)
        //   firebase.database().ref('usernames/' + username + '/security/formOfAdress').set(dropdownValue)
    }

    async function getUsername() {
        /*  const snap = await firebase.database().ref('usernames/' + username).get();
          if (snap.val()) {
              console.log(snap.val())
              return true;
          }
          return false*/
    }

    async function validate() {
        const isUserAlreadyUsed = await getUsername();

        if (!isUserAlreadyUsed) {
            if (firstPw === password) {
                if (username.length > 1) {
                    storeUser()
                    console.log(username)
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


    return (
        <div>
            <NavLink to="/"></NavLink>
            <Button variant="contained" sx={{color: "#FF0000"}}>Create Account
                Token</Button>
            <TextField
                sx={{width: '600px'}}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

        </div>
    );
}