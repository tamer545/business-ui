import logo from './logo.svg';
import './App.css';
import SearchBar from './business-ui/SearchBar'
import Login from "./business-ui/Login";
import Registration from "./business-ui/Registration";
import MeetingList from "./business-ui/MeetingList";
import {BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {

    //TODO Implement Routing over different Sites
    return (
        <>
            <SearchBar/>
            <BrowserRouter>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={'/business'} element={<MeetingList/>}/>
                    <Route path={'/'} element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
        ;
}

export default App;
