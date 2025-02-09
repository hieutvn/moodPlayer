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

import { requestCurrentTrack, addTrack, getQueue, getCurrentSongData } from './AudioTrack';



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

const CurrentSongContext = createContext();

export function CurrentSongProvider({ children }) {

    const [currentSongCtx, setCurrentSongCtx] = useState(null);

    return (

        <CurrentSongContext.Provider value={{ currentSongCtx, setCurrentSongCtx }}>
            {children}
        </CurrentSongContext.Provider>
    )
}

export function useCurrentSong() {

    return useContext(CurrentSongContext);
}


export default function PlayerControls(props) {

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


    if (!is_active) {

        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b>Player getting access...</b>
                    </div>
                </div>
            </>)
    }
    else {

        return (

            <div className={styles.playercontrols_container}>
                <div className={styles.album_cover}>
                    <img src={currentSong.album_img} alt={currentSong.album} />
                </div>

                <div className={styles.player}>

                    <div className={styles.current_playing_progress}>
                        <div className={styles.duration}>00:00</div>
                        <progress className={styles.current_playing_progressbar} value={songPosition / 100} />
                        <div className={styles.current_playing_progressdot}></div>

                        <div className={styles.duration}>{currentSong.duration}</div>

                    </div>

                    <div className={styles.song_info}>
                        <div className={styles.artist_title}>

                            <p>{currentSong.artist !== null ? currentSong.artist : "Unknown"}</p>
                        </div>
                        <div className={styles.song_title}>
                            <p>{currentSong.song !== null ? currentSong.song : "Unknown"}</p>
                        </div>
                    </div>

                    <div className={styles.player_controls}>

                        <div className={styles.player_controls_left}>

                            <SoundVolumeIcon style={{ width: '1.25rem' }} />
                            <div className={styles.volume_bar_container}>
                                <div className={styles.volume_bar}></div>
                                <div className={styles.volume_bar_dot}></div>

                            </div>
                        </div>

                        <div className={styles.player_controls_main}>
                            <button className={styles.player_play_prev_album_btn}>
                                <PlayNextAlbumIcon style={{ transform: 'rotate(180deg)' }} />
                            </button>
                            <button className={styles.player_play_prev_song_btn} onClick={() => { webplayer.previousTrack().then(() => console.log("PLAYING PREV SONG")) }}>
                                <PlayNextSongIcon style={{ transform: 'rotate(180deg)' }} />

                            </button>
                            <button className={styles.player_play_btn} onClick={() => {
                                webplayer.togglePlay().then(() => { console.log('Toggled playback!'); });

                            }}>

                                {(is_paused) ? <PlayIcon style={{ width: '1.25rem', opacity: 1, transition: 'opacity 0.3s ease-in-out' }} /> : <PauseIcon style={{ width: '1.25rem', opacity: 1, transition: 'opacity 0.3s ease-in-out' }} />}


                            </button>
                            <button className={styles.player_play_next_song_btn} onClick={() => {
                                webplayer.nextTrack().then(() => { console.log("PLAYING NEXT SONG") })
                            }}>
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

//{(is_paused) ? <PlayIcon className={`${styles.play_icon}`} /> : <PauseIcon className={styles.pause_icon} />}
