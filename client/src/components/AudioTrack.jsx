import { useEffect, useState, createContext, useContext } from "react";
import ArtistInfo from "./ArtistInfo";
import AlbumInfo from "./AlbumInfo";

import styles from '../assets/styles/audiotrackcard.module.css';
import useAuth from "./useAuth";



export default function AudioTrackCard() {

    const reqAccessToken = useAuth();
    const [currentTrackSet, setCurrentTrackSet] = useState({});
    const [songInfo, setSongInfo] = useState({ artist: null, song: null, album: null, album_id: null });

    //const { currentSongCtx } = useCurrentSong();

    useEffect(() => {

        const reqSongData = async () => {

            const data = await getCurrentSongData(props.token);

            if (data) setSongInfo("current song", data);

        }

        reqSongData()

    }, [reqAccessToken]);

    useEffect(() => {

        const reqAlbumData = async () => {

            const data = await requestAlbum(reqAccessToken, songInfo.album_id);

            if (data) {

                //setTrackSet(data.tracks.items);
                console.log("alb", data)
            }
        }

        reqAlbumData();


    }, [songInfo]);




    if (!songInfo) {

        return (

            <h3>Info loading...</h3>
        )
    }
    else {

        return (

            <div className={styles.wrapper}>
                <div className={styles.artist_info}>


                    <img className={styles.aritst_image} src="" alt="" />

                    <div className={styles.artist_info_wrapper}>
                        <div className={styles.artist_music_tags}>
                            <span className={styles.tag}>Hip Hop</span>
                            <span className={styles.tag}>Rap</span>
                        </div>
                        <div className={styles.artist_info_container}>

                            <div className={styles.artist_music_tags}>

                                <p className={styles.artist_name}>{!songInfo.artist ? "-" : songInfo.artist}</p>
                                <p className={styles.artist_monthly_listeners}>00000 monthly listeners</p>
                            </div>
                            <button className={styles.follow_btn}>FOLLOW</button>


                        </div>
                    </div>

                </div>

                <div className={styles.album_info}>
                    <div className={styles.album_info_top}>
                        <span className={styles.album_info_header}>Album</span>
                        <p className={styles.album_info_name}>{songInfo.album}</p>
                    </div>

                    <span className={styles.album_info_header}>Song List</span>
                    <ul className={styles.album_song_list}>
                        <li className={styles.current_playing}>Song 1</li>
                        <li className={styles.current_playing}>Song 2</li>
                        <li>Song 3</li>

                    </ul>

                </div>

            </div>
        )
    }
}






export const AudioContext = createContext({ artist: "", song: "", album: "" });
export function AudioProvider({ children }) {

    const [currentAudio, setCurrentAudio] = useState(null);

}

export function useAudio() {

    return useContext(AudioContext);
}






export async function requestCurrentTrack(token) {

    try {
        //const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
            //const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${props.device_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        console.log("current song req", data)

    }
    catch (error) { console.error(error); }
}

export async function requestAlbum(token, album_id) {

    const response = await fetch(`https://api.spotify.com/v1/albums/${album_id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();

    console.log("current album req", data)
}


// noch in useEffect packen, ggf in andere Doc/Component packen
export async function addTrack(device_id, token) {
    const trackUri = 'spotify:track:11dFghVXANMlKmJXsNCbNl'; // nicht hardcoden

    let currentTrack = {

        artist: "",
        song: "",
        album: "",
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${trackUri}&device_id=${device_id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"

            },
        });

        if (response.ok) {
            console.log("add to queue", response.json())



        }
        else { console.error("nah", await response.json()) }


    }
    catch (error) { console.error(error); }
}

export async function getQueue(token) {

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/queue`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"

            },
        });

        const data = await response.json();

        console.log("queue", data)

    }
    catch (error) { console.error(error); }
}

export async function reqCurrentSong(token) {

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"

            },
        });

        const data = await response.json();

        console.log("current song", data)

        return data;
    }
    catch (error) { console.error(error); }

}

export async function getCurrentSongData(token) {

    let currentTrack = {

        artist: "",
        song: "",
        album: "",
        album_id: ""
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"

            },
        });

        const data = await response.json();


        currentTrack.artist = data.item.artists[0].name;
        currentTrack.song = data.item.name;
        currentTrack.album = data.item.album.name;
        currentTrack.album_id = data.item.album.id;

        console.log("current track object", currentTrack)

        return currentTrack;
    }

    catch (error) { console.error(error); }

}




