import styles from '../assets/styles/login.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom';

import SpotifyLogo from '../assets/img/spotify-logo.svg';

function Login() {

    function handleAuth() {

        window.location.href = '/api/auth/login';
    }

    return (

        <>

            <section id={styles.content} >

                <div id={styles.title_wrapper}>
                    <h1 id={styles.title_header}>moodplayer.</h1>
                    <span id={styles.title_subheader}>Discover new tracks & albums effortlessly.</span>
                </div>
                <Link to="/api/auth"><button id={styles.connect_with_spotify_btn} onClick={handleAuth}>Connect with Spotify</button></Link>
            </section>


            <span id={styles.application_of_spotify_tag}>
                <span>third party application for</span>
                <SpotifyLogo id={styles.application_of_spotify_logo} alt="Spotify" />
            </span>
        </>
    )
}

export default Login;