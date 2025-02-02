import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';



import styles from '../assets/styles/homepage.module.css';

import SearchBar from './SearchBar';
import MoodsContainer from './MoodsContainer';
import SuggestedMoodsPanel from './SuggestedMoodsPanel';
import { useEffect } from "react";



export default function Dashboard() {


    async function fetchToken() {

        try {
            const tokens = await axios.get("http://localhost:3000/api/auth/get-token");

            const accessToken = tokens.data.accessToken;
            const refreshToken = tokens.data.refreshToken;

            if (accessToken && refreshToken) {

                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
            }

        } catch (error) {

            console.log(error);
        }


    }

    useEffect(() => {

        fetchToken();



    });

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <SearchBar />
            <SuggestedMoodsPanel />
            <MoodsContainer />



        </div>
    )
}