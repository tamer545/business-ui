import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {Container, TextField} from "@mui/material";
import firebase from "firebase/compat";


export default function NewMeeting(props) {
    const [taskName, setTaskName] = useState('')
    const [dateToDo, setDateToDo] = useState('')
    const [extraInfo, setExtraInfo] = useState('')

    function onCreate(name, dateAdded, dateToDo, extraInfo) {
        addRow(name, dateAdded, dateToDo, extraInfo)
        setExtraInfo('')
        setTaskName('')
    }

    function addRow(name, dateAdded, dateToDo, extraInfo) {
        props.setRows([...props.rows, {name, dateAdded, dateToDo, extraInfo}])
    }

    function storeEntry() {
        if (props.user != null) {
            firebase.database().ref('users/' + props.user + '/entries/').set(props.rows);
        }
    }

    function readEntrys() {
        console.log(props.user)
        firebase.database().ref('users/' + props.user + '/entries/').on('value', (snap) => {
            if (snap.val()) {
                props.setRows(snap.val())
            }
        })
    }

    useEffect(() => {
        readEntrys()
        props.setAuthenticated(true)
    }, [])

    useEffect(() => {
        storeEntry()
    }, [props.rows])

    return (
        <Container>
            <TextField sx={{width: '600px'}} placeholder="Task Name"
                       value={taskName}
                       onChange={e => setTaskName(e.target.value)}/>
            <TextField sx={{width: '600px'}} placeholder="Extra Information"
                       value={extraInfo}
                       onChange={e => setExtraInfo(e.target.value)}/>
               <TextField
                sx={{width: '600px'}}
                placeholder="Date To Do"
                type="date"
                value={dateToDo}
                onChange={e => setDateToDo(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button sx={{ml: 2, mr: 4}} variant="contained"
                    onClick={() => onCreate(taskName, new Date().toLocaleDateString("uk-Uk"), new Date(dateToDo).toLocaleDateString("uk-UK"), extraInfo)}>Create</Button>
        </Container>
    );
}