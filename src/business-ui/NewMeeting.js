import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import firebase from "firebase/compat";


export default function NewMeeting(props) {
    const [taskName, setTaskName] = useState('')
    const [dateToDo, setDateToDo] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [loading, setLoading] = useState(false)

    function onCreate(name, dateAdded, dateToDo, extraInfo) {
        addRow(name, dateAdded, dateToDo, extraInfo)
        setExtraInfo('')
        setTaskName('')
    }

    function addRow(name, dateAdded, dateToDo, extraInfo) {
        props.setRows([...props?.rows, {name, dateAdded, dateToDo, extraInfo}])
        storeEntry()
    }

    function storeEntry() {
        if (props.user != null) {
            firebase.database().ref('users/' + props.user + '/entries').set(props?.rows);
        }
    }

    function readEntrys() {
        firebase.database().ref('users/' + props.user + '/entries').on('value', (snap) => {
            if (snap.val()) {
                props.setRows(snap.val())
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        readEntrys()
        props.setAuthenticated(true)
    }, [])

    function removeAll() {
        let newArray = []
        props.setRows(newArray)

        if (props.user != null) {
            firebase.database().ref('users/' + props.user + '/entries').set(newArray);
        }
    }

    return (
        <div>
            <TextField sx={{ml: 5, mr: 5}} id="outlined-basic" label="Task Name" variant="outlined"
                       value={taskName}
                       onChange={e => setTaskName(e.target.value)}/>
            <TextField sx={{ml: 5, mr: 5}} id="outlined-basic" label="Extra Information" variant="outlined"
                       value={extraInfo}
                       onChange={e => setExtraInfo(e.target.value)}/>
            <TextField
                sx={{ml: 5, mr: 5}}
                label="Date To Do"
                type="date"
                value={dateToDo}
                onChange={e => setDateToDo(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button sx={{ml: 2, mr: 4}} variant="contained"
                    onClick={() => onCreate(taskName, new Date().toLocaleDateString("uk-Uk"), new Date(dateToDo).toLocaleDateString("uk-UK"), extraInfo)}>Create</Button>
        </div>
    );
}