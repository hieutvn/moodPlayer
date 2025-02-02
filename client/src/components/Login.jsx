import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



import styles from '../assets/styles/login.module.css'
import { Link } from 'react-router-dom';

import SpotifyLogo from '../assets/img/spotify-logo.svg';


function Login() {


    const login = async () => {

        try {

            const response = await axios.get("http://localhost:3000/api/auth/login");

            if (response.data.redirectURL) {

                window.location.href = response.data.redirectURL;
            }
        }
        catch (error) {

            console.log(error)
        }

    }

    return (

        <>

            <section id={styles.content} >

                <div id={styles.title_wrapper}>
                    <h1 id={styles.title_header}>moodplayer.</h1>
                    <span id={styles.title_subheader}>Discover new tracks & albums effortlessly.</span>
                </div>
                <button id={styles.connect_with_spotify_btn} onClick={login}>Connect with Spotify</button>
            </section>


            <span id={styles.application_of_spotify_tag}>
                <span>third party application for</span>
                <SpotifyLogo id={styles.application_of_spotify_logo} alt="Spotify" />
            </span>
        </>
    )
}

export default Login;