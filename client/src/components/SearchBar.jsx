import styles from '../assets/styles/searchbar.module.css';
import RandomPlayIcon from '../assets/img/random-play-icon.svg';
import PlayIcon from '../assets/img/play-icon.svg';

function SearchBar() {


    return (

        <div className={styles.search_container}>
            <div className={styles.search_wrapper}>
                <input className={styles.search_bar} type="text" placeholder="Search for a tag..." />
                <button className={styles.btn} id={styles.randomize_btn} type="submit" >
                    <RandomPlayIcon className={styles.icon} />
                </button>
                <button className={styles.btn} id={styles.play_btn} type="submit">
                    <PlayIcon className={styles.icon} />
                </button>
            </div>
        </div>
    )
}

export default SearchBar;
