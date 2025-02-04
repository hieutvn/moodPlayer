import { useEffect, useState, createContext, useContext } from 'react';

import styles from '../assets/styles/playercontrols.module.css';


// SVGs
import PlayIcon from '../assets/img/play-icon.svg';
import PauseIcon from '../assets/img/pause-icon.svg';
import PlayNextSongIcon from '../assets/img/play-next-song-icon.svg';
import PlayNextAlbumIcon from '../assets/img/play-next-album-icon.svg';
import AddSongToLibIcon from '../assets/img/add-song-to-lib-icon.svg';
import AddAlbumToLibIcon from '../assets/img/add-album-to-lib-icon.svg';
import SoundVolumeIcon from '../assets/img/sound-volume-icon.svg';

import { useAudioTrack, requestTrack, requestCurrentTrack, addTrack, getQueue, getCurrentSong } from './AudioTrack';



const track = {

    name: "",
    album: {

        images: [

            { url: "" }
        ]
    },
    artists: [

        { name: "" }
    ]
}

export const SongInfoContext = createContext();


function PlayerControls(props) {

    const [player, setPlayer] = useState(undefined);
    const [is_active, setActive] = useState(false);
    const [is_paused, setPaused] = useState(false);
    const [current_track, setTrack] = useState('');
    const [song_info, setSongInfo] = useState(null);
    const [device_id, setDeviceId] = useState(null);


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
                setPlayer(player);

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
                //console.log('Position in Song', position);
                //console.log('Duration of Song', duration);

                if (!state) {

                    return;
                }
                setTrack(state.track_window.current_track);
                getQueue(props.token)
                setPaused(state.paused);


                player.getCurrentState().then(state => {

                    (!state) ? setActive(false) : setActive(true);
                    setSongInfo(state);
                });

            });

            player.connect()
                .then(success => {

                    (success) ? console.log("The Web Playback SDK successfully connected to Spotify!") : console.error("Error");
                });

        }
    }, []);


    useEffect(() => {

        requestCurrentTrack(props.token)
        requestTrack(props.token);
        getCurrentSong(props.token)

    }, [song_info])


    if (!is_active) {

        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    }
    else {

        return (

            <div className={styles.playercontrols_container}>
                <div className={styles.album_cover}>
                    <img src="" alt="" />
                </div>

                <div className={styles.player}>

                    <div className={styles.current_playing_progress}>
                        <div className={styles.current_playing_progressbar}></div>
                        <div className={styles.current_playing_progressdot}></div>

                    </div>

                    <div className={styles.song_info}>
                        <div className={styles.artist_title}>

                            <p>ARTIST</p>
                        </div>
                        <div className={styles.song_title}>
                            <p>NAME</p>
                        </div>
                    </div>

                    <div className={styles.player_controls}>

                        <div className={styles.player_controls_left}>

                            <SoundVolumeIcon style={{ width: '1.25rem' }} />
                        </div>

                        <div className={styles.player_controls_main}>
                            <button className={styles.player_play_prev_album_btn}>
                                <PlayNextAlbumIcon style={{ transform: 'rotate(180deg)' }} />
                            </button>
                            <button className={styles.player_play_prev_song_btn} onClick={() => { player.previousTrack().then(() => console.log("PLAYING PREV SONG")) }}>
                                <PlayNextSongIcon style={{ transform: 'rotate(180deg)' }} />
                            </button>
                            <button className={styles.player_play_btn} onClick={() => {
                                player.togglePlay().then(() => { console.log('Toggled playback!'); });

                            }}>

                                {(is_paused) ? <PlayIcon style={{ width: '1.25rem', opacity: 1, transition: 'opacity 0.3s ease-in-out' }} /> : <PauseIcon style={{ width: '1.25rem', opacity: 1, transition: 'opacity 0.3s ease-in-out' }} />}


                            </button>
                            <button className={styles.player_play_next_song_btn} onClick={() => { player.nextTrack().then(() => console.log("PLAYING NEXT SONG")) }}>
                                <PlayNextSongIcon style={{ width: '1.25rem' }} />
                            </button>
                            <button className={styles.player_play_next_album_btn}><PlayNextAlbumIcon style={{ width: '1.25rem' }} /></button>
                            <div className={styles.player_controls_right}>
                                <button className={styles.player_add_song_to_lib}>
                                    <AddSongToLibIcon style={{ width: '1.25rem' }} />
                                </button>
                                <button className={styles.player_add_album_to_lib}>
                                    <AddAlbumToLibIcon style={{ width: '1.25rem' }} />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default PlayerControls;

//{(is_paused) ? <PlayIcon className={`${styles.play_icon}`} /> : <PauseIcon className={styles.pause_icon} />}
