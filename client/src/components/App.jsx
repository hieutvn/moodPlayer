import { useState, useEffect } from 'react';
import axios from 'axios';

import Login from './Login';
import NavBar from './Navbar';
import Dashboard from './Dashboard';
import Navigation from './Navigation';

import '../assets/styles/root.css';



export default function App() {

    useEffect(() => {


    }, [])

    return (

        <>

            <Navigation />
            <Dashboard />
        </>
    )
}