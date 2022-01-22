import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat/app";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAM1vEEvn0XmqGLDYrSGaW-xnv8ogOT-Ok",
    authDomain: "biz-trips.firebaseapp.com",
    databaseURL: "https://biz-trips-default-rtdb.firebaseio.com",
    projectId: "biz-trips",
    storageBucket: "biz-trips.appspot.com",
    messagingSenderId: "676070572591",
    appId: "1:676070572591:web:c3829d8af4edef03c0fcda",
    measurementId: "G-D32CCJ4FF0"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
        <App/>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
