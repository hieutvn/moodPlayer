import styles from '../assets/styles/home.module.css';
import RefreshIcon from '../assets/img/refresh-icon.svg';
import SpotifyLogo from '../assets/img/spotify-logo.svg';


export default function Home() {

    return (

        <>


            <section id={styles.content}>
                <span>
                    <h1 id={styles.header_text}>what's your mood today?</h1>
                </span>

                <div id={styles.add_tag_cont}>

                    <div id={styles.added_tag_wrapper}>
                        <span className={styles.added_tag}>
                            <span className={styles.added_tag_name}>[NAME]</span>
                            <span className={styles.delete_added_tag}></span>
                        </span>
                        <span className={styles.added_tag}>
                            <span className={styles.added_tag_name}>[NAME]</span>
                            <span className={styles.delete_added_tag}></span>
                        </span>
                        <span className={styles.added_tag}>
                            <span className={styles.added_tag_name}>[NAME]</span>
                            <span className={styles.delete_added_tag}></span>
                        </span>
                        <span className={styles.added_tag}>
                            <span className={styles.added_tag_name}>[NAME]</span>
                            <span className={styles.delete_added_tag}></span>
                        </span>
                    </div>

                    <div id={styles.added_tag_counter}><span>0/4</span></div>
                </div>


                <div id={styles.search_wrapper}>

                    <input id={styles.search_bar} type="text" placeholder="Search for a tag..." />
                    <div id={styles.btn_wrapper}>
                        <button className={styles.search_btn} id={styles.randomzie_btn} type="submit">Randomize</button>
                        <button className={styles.search_btn} id={styles.play_btn} type="submit">Play</button>
                    </div>
                </div>


                <div id={styles.suggested_tags_cont}>

                    <span className={styles.suggested_tag}>
                        <span className={styles.suggested_tag_name}>[NAME]</span>
                    </span>
                    <span className={styles.suggested_tag}>
                        <span className={styles.suggested_tag_name}>[NAME]</span>
                    </span>
                    <span className={styles.suggested_tag}>
                        <span className={styles.suggested_tag_name}>[NAME]</span>
                    </span>
                    <span id={styles.refresh_btn}>
                        <RefreshIcon alt="Refresh" />
                    </span>
                </div>

                <span id={styles.spotify_branding}>
                    <h5>third party application of</h5>
                    <SpotifyLogo id={styles.spotify_logo} alt="Spotify" />
                </span>
            </section>

        </>
    )
}