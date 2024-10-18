import styles from '../assets/styles/homepage.module.css';

import RandomPlayIcon from '../assets/img/random-play-icon.svg';


export default function HomePage() {



    return (

        <>
            <div className={styles.top_content}>
                <div className={styles.search_wrapper}>

                    <input className={styles.search_bar} type="text" placeholder="Search for a tag..." />
                    <div className={styles.btn_wrapper}>
                        <button className={styles.btn} id={styles.randomzie_btn} type="submit" >
                            <RandomPlayIcon />
                        </button>
                        <button className={styles.btn} id={styles.play_btn} type="submit">Play</button>
                    </div>
                </div>

                <div className={styles.moods_container}>

                    <div className={styles.moods_container_top}>
                        <span className={styles.moods_container_header}>moods</span>
                        <span className={styles.moods_container_counter}>0/4</span>
                        <div className={styles.moods_container_moodtags}></div>
                    </div>
                </div>
            </div>
        </>
    )
}