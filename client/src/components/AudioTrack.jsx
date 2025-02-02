import { useEffect, useState, createContext, useContext } from "react";
import ArtistInfo from "./ArtistInfo";
import AlbumInfo from "./AlbumInfo";

let trackObj = {};
export const AudioContext = createContext();


export function useAudioTrack(track) {

    const [currentAudio, setCurrentAudio] = useState('null');

    useEffect(() => {

        if (track === null) setCurrentAudio(currentAudio);

    }, [track]);

    return currentAudio;
}

export async function requestTrack(token) {

    const trackUri = '11dFghVXANMlKmJXsNCbNl';

    try {
        //const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackUri}`, {
            //const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${props.device_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        console.log("song req", data)

    }
    catch (error) { console.error(error); }
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

export async function getCurrentSong(token) {

    //const [track, setTrack] = useState('');

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"

            },
        });

        const data = await response.json();

        return data;
    }
    catch (error) { console.error(error); }

}

export async function getCurrentSongData() {

    const data = await getCurrentSong()
    let currentTrack = {

        artist: "",
        song: "",
        album: "",
    }
    currentTrack.artist = data.item.artists[0].name;
    currentTrack.song = data.item.name;
    currentTrack.album = data.item.album.name;
    setTrack(currentTrack);
}

export function useAudio() {

    return useContext(AudioContext);
}



export default useAudioTrack;