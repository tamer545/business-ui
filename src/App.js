import logo from './logo.svg';
import './App.css';
import SearchBar from './business-ui/SearchBar'
import Login from "./business-ui/Login";
import Registration from "./business-ui/Registration";
import MeetingList from "./business-ui/MeetingList";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useState} from "react";
import NewMeeting from "./business-ui/NewMeeting";


function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [rows, setRows] = useState([]);
    const [user, setUser] = useState(undefined)

    return (
        <>
            <BrowserRouter>
                <SearchBar authenticated={authenticated} user={user}/>
                <Routes>
                    <Route path={'/login'} element={<Login user={user} setUser={setUser}/>}/>
                    <Route path={'/registration'} element={<Registration user={user} setUser={setUser}/>}/>
                    <Route path={'/business'} element={<MeetingList user={user} setUser={setUser} rows={rows} setRows={setRows} setAuthenticated={setAuthenticated}/>}/>
                    <Route path={'/newMeetings'} element={<NewMeeting user={user} setUser={setUser} rows={rows} setRows={setRows} setAuthenticated={setAuthenticated}/>}/>
                    <Route path={'/'} element={<Login user={user} setUser={setUser}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
        ;
}

export default App;
