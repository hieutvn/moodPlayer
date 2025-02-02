import { useEffect, useState, useContext } from 'react';
import styles from '../assets/styles/albuminfo.module.css';
import useAudioTrack from './AudioTrack';

function AlbumInfo() {

    const [isPlaying, setPlaying] = useState(true);
    const data = useContext(useAudioTrack);


    useEffect(() => {

        if (!data) return;
        console.log(data)
    }, [data])

    if (!data) {

        return <h1>Data loading</h1>
    }
    else {
        return (
            <div className={styles.album_info}>
                <div className={styles.album_info_top}>
                    <span className={styles.album_info_header}>Album</span>
                    <p className={styles.album_info_name}>METRO BOOMIN PRESENTS SPIDER‐MAN: ACROSS THE SPIDER‐VERSE: SOUNDTRACK FROM AND INSPIRED BY THE MOTION PICTURE
                    </p>
                </div>

                <hr />
                <span className={styles.album_info_header}>Song List</span>
                <ul className={styles.album_song_list}>
                    <li className={`${isPlaying ? styles.current_playing : ''}`}>Song 1</li>
                    <li className={styles.current_playing}>Song 2</li>
                    <li>Song 3</li>

                </ul>

            </div>)


    }





}

export default AlbumInfo;