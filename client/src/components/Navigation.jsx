import { useState } from 'react';

import styles from '../assets/styles/navigation.module.css';
import SearchIcon from '../assets/img/search-icon.svg';
import HistoryIcon from '../assets/img/history-icon.svg';
import RandomizeIcon from '../assets/img/random-play-icon.svg';
import DeleteIcon from '../assets/img/delete-icon.svg';

import MoodsContainer from './MoodsContainer';

function Navigation() {

    const [isHistoryToggled, setHistoryToggled] = useState(false);
    const [isSearchToggled, setSearchToggled] = useState(false);


    return (

        <div className={styles.navigation_wrapper}>

            <div className={styles.logo_icon_container}>
                <h4 className={styles.logo}>moodplayer.</h4>
                <div className={styles.icon_wrapper} onClick={() => setHistoryToggled(!isHistoryToggled)}>
                    <HistoryIcon alt='Listening History' className={`${styles.icon} ${isHistoryToggled ? styles.toggled : ''}`} />
                </div>

                <div className={styles.icon_wrapper} onClick={() => setSearchToggled(!isSearchToggled)}>
                    <SearchIcon alt='Search' className={`${styles.icon} ${isSearchToggled ? styles.toggled : ''}`} />
                </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                <div className={`${styles.search_bar_container}  ${isSearchToggled ? '' : styles.collapsed}`}>
                    <div className={styles.search_wrapper}>

                        <input className={`${styles.search_bar} ${isSearchToggled ? '' : styles.collapsed}`} autoFocus type="text" placeholder="Search for a tag..." />
                    </div>
                </div>

                <div className={`${styles.moods_container}  ${isSearchToggled ? '' : styles.collapsed}`}>
                    <MoodsContainer />

                    <div className={styles.icon_wrapper} onClick={() => console.log("Delete clicked")}>
                        <DeleteIcon className={styles.delete_icon} style={{ width: '1rem' }} />
                    </div>
                    <div className={styles.icon_wrapper} onClick={() => console.log("Random clicked")}>
                        <RandomizeIcon className={styles.randomize_icon} style={{ width: '1rem' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation;