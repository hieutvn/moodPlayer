import { useContext, useEffect } from 'react';
import styles from '../assets/styles/artistinfo.module.css';
import useAudioTrack from './AudioTrack';



function ArtistInfo() {

    const data = useContext(useAudioTrack);


    return (

        <div className={styles.artist_info}>

            <img className={styles.aritst_image} src="" alt="" />

            <div className={styles.artist_info_wrapper}>
                <div className={styles.artist_music_tags}>
                    <span className={styles.tag}>Hip Hop</span>
                    <span className={styles.tag}>Rap</span>
                </div>
                <div className={styles.artist_info_container}>

                    <div className={styles.artist_music_tags}>

                        <p className={styles.artist_name}>ARTISTNAME</p>
                        <p className={styles.artist_monthly_listeners}>00000 monthly listeners</p>
                    </div>
                    <button className={styles.follow_btn}>FOLLOW</button>


                </div>
            </div>

        </div>
    )
}

export default ArtistInfo;