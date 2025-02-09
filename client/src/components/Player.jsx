import { useEffect, useState } from "react";



export default function Player(props) {
    const [webplayer, setPlayer] = useState(undefined);
    const [is_active, setActive] = useState(false);
    const [is_paused, setPaused] = useState(false);
    const [device_id, setDeviceId] = useState(null);


    const [currentSong, setCurrentSong] = useState
        ({
            artist: null,
            song: null,
            album: null,
            album_img: null,
            duration: null
        });

    const [songPosition, setSongPosition] = useState(0);


    //const { setCurrentSongCtx } = useCurrentSong();

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

            //ERRORS
            player.on('initialization_error', ({ message }) => {
                console.error('Failed to initialize', message);
            });

            player.on('authentication_error', ({ message }) => {
                console.error('Failed to authenticate', message);
            });

            player.on('account_error', ({ message }) => {
                console.error('Failed to validate Spotify account', message);
            });

            player.on('playback_error', ({ message }) => {
                console.error('Failed to perform playback', message);
            });


            player.addListener('ready', ({ device_id }) => {

                console.log("Ready with Device ID: ", device_id);
                setDeviceId(device_id);
                if (webplayer === undefined) setPlayer(player);

                //const connectDeviceBoo = connectDevice(props.token, device_id);

                //playSong(props.token)
                const connect_to_device = () => {
                    console.log("Changing to device");
                    let change_device = fetch("https://api.spotify.com/v1/me/player", {
                        method: "PUT",
                        body: JSON.stringify({
                            device_ids: [device_id],
                            play: false,
                        }),
                        headers: new Headers({
                            Authorization: "Bearer " + props.token,
                        }),
                    }).then((response) => {
                        console.log(response)
                    });
                };
                connect_to_device();

                //(!connectDeviceBoo) ? setActive(false) : setActive(true)

            });

            player.addListener('not_ready', ({ device_id }) => {

                console.log("Offline Device ID: ", device_id);
            });

            player.addListener('player_state_changed', (state) => {
                //console.log('Currently Playing', current_track);

                if (!state) {

                    return;
                }


                // SET NEW SONG STATE
                // GET CURRENT TRACK INFOS 
                // GETS RENDERED IN THE RETURN ---> ARTIST, SONG, ALBUM

                setCurrentSong({

                    artist: state.track_window.current_track.artists.map((artist) => artist.name).join(", "), // For multiple artists
                    song: state.track_window.current_track.name,
                    album: state.track_window.current_track.album.name,
                    album_img: state.track_window.current_track.album.images[0].url,
                    duration: ((state.track_window.current_track.duration_ms / 1000) / 60).toFixed(2)
                });

                // SET FOR CONTEXT HOOK
                //setCurrentSongCtx(currentSong);

                setPaused(state.paused);


                player.getCurrentState().then(state => {

                    (!state) ? setActive(false) : setActive(true);
                    //setSongInfo(state);

                });

            });

            player.connect()
                .then(success => {

                    (success) ? console.log("The Web Playback SDK successfully connected to Spotify!") : console.error("Error");
                });

        }
    }, []);


    useEffect(() => {

        const interval = setInterval(async () => {

            if (webplayer) {
                const state = await webplayer.getCurrentState();

                if (state) {

                    const songDuration = state.track_window.current_track.duration_ms.toFixed(2);
                    const currentPos = state.position.toFixed(2);
                    const val = Math.floor((currentPos / songDuration) * 100);

                    setSongPosition(val);
                };


            }
        }, 100);

        return () => clearInterval(interval);

    }, [webplayer]);

}
