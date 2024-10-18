import { useState, useEffect } from 'react';
import axios from 'axios';

import Login from './Login';
import NavBar from './Navbar';
import HomePage from './HomePage';

import '../assets/styles/root.css';


export default function App() {


    useEffect(() => {


    }, [])

    return (

        <>

            <NavBar />
            <HomePage />

        </>
    )
}