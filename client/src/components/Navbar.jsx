import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

import SearchIcon from '../assets/img/search-icon.svg';
import ListenIcon from '../assets/img/listen-icon.svg';
import HistoryIcon from '../assets/img/history-icon.svg';
import MoodPlayerIcon from '../assets/img/moodplayer-logo-icon.svg';

import styles from '../assets/styles/navbar.module.css';


export default function Navbar() {

    const [isToggled, setIsToggled] = useState(false);

    const toggleNav = () => {

        setIsToggled(!isToggled);
    }

    return (

        <>

            <div className={styles.navbar_container} onClick={toggleNav}>
                <MoodPlayerIcon className={styles.logo} />

                <nav className={`${styles.navbar} ${isToggled ? styles.toggle : ''}`}>
                    <div className={styles.triangle}></div>

                    <div className={styles.navbar_wrapper}>
                        <NavLink className="nav_search" to="/search">
                            <SearchIcon alt="Search" />
                        </NavLink>
                        <NavLink className="nav_listen">
                            <ListenIcon alt="Listen" />
                        </NavLink>
                        <NavLink className="nav_history">
                            <HistoryIcon alt="History" />
                        </NavLink>

                        <div className={styles.user_profile}></div>

                    </div>

                    <div className={styles.options}>
                        <div className={styles.dots}></div>
                        <div className={styles.dots}></div>
                        <div className={styles.dots}></div>
                    </div>
                </nav>
            </div>
        </>
    )
}