import { useEffect, useState } from "react";


function Player(props) {

    const [player, setPlayer] = useState(undefined);
    const [is_active, setActive] = useState(false);
    const [is_paused, setPaused] = useState(false);
    const [current_track, setTrack] = useState('');

    useEffect(() => {

        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new Spotify.Player({

                name: "Spotify Web Player",
                getOAuthToken: cb => { cb(props.token) },
                volume: 0.5
            });

            setPlayer(player);


            player.addListener('ready', ({ device_id }) => {

                console.log("Ready with Device ID: ", device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {

                console.log("Offline Device ID: ", device_id);
            });


            player.connect();
        }

    }, []);


    return (

        <>
            Player

        </>
    )
}

export default Player;