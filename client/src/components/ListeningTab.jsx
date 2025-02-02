
import { useEffect, useState } from "react";


import Player from "./Player";
import Login from "./Login";
import Navbar from "./Navbar";
import MoodsContainer from "./MoodsContainer";
import PlayerControls from "./PlayerControls";
import AlbumInfo from "./AlbumInfo";
import ArtistInfo from "./ArtistInfo";
import Navigation from "./Navigation";



import styles from '../assets/styles/listeningtab.module.css';
import useAuth from "./useAuth";




function ListeningTab() {

    //const [token, setToken] = useState({ accessToken: undefined, refreshToken: undefined });
    const [token, setToken] = useState(null);
    const [song_info, setSongInfo] = useState(null);
    const accessToken = useAuth();

    useEffect(() => {



    }, []);

    return (

        <div>
            <Navigation />

            <div className={styles.content}>

                <div className={styles.left_panel}>

                </div>

                <div className={styles.main_panel}>

                    {(token === null) ? <h1>No Player active.</h1> : <PlayerControls token={accessToken} />}


                </div>

                <div className={styles.right_panel} >

                    <ArtistInfo />
                    <AlbumInfo />


                </div>

            </div>
        </div>
    )

}

export default ListeningTab;



//            {(token === null) ? <Login /> : <Player token={token} />}
