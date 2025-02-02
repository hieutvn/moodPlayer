import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../assets/styles/moodscontainer.module.css';
import XBtn from '../assets/img/x-btn-icon.svg';


function MoodTag() {

    this.tag = tag;

    const [component, setComponent] = useState([]);

    const retMoodTag = ({ text }) => {

        return (

            <span className={styles.moods_tag}>
                <span className={styles.moods_tag_wrapper}>{text}</span>
                <XBtn className={styles.moods_x_btn} />
            </span>)
    }
}


function MoodsContainer() {

    const [moodTag, setMoodTag] = useState([]);

    const addMoodTag = () => {

        const newMoodTag = {

            text: "TEST"
        }


        setMoodTag((prev) => [...prev, newMoodTag]);
    }

    const removeMoodTag = () => {

        // TBD
    }


    return (

        <div className={`${styles.moods_container}`} >

            <div className={`${styles.moodtags_container}`}>


                <span className={styles.tag}>
                    <span className={styles.tag_wrapper}>AAAA</span>
                    <XBtn className={styles.x_btn} />
                </span>
                <span className={styles.tag}>
                    <span className={styles.tag_wrapper}>AAAA</span>
                    <XBtn className={styles.x_btn} />
                </span>
                <span className={styles.tag}>
                    <span className={styles.tag_wrapper}>AAAA</span>
                    <XBtn className={styles.x_btn} />
                </span>
                <span className={styles.tag}>
                    <span className={styles.tag_wrapper}>AAAA</span>
                    <XBtn className={styles.x_btn} />
                </span>


            </div>
        </div>
    )
}


export default MoodsContainer;

//<button onClick={addMoodTag}>add</button>
//        <div className={`${(props.container === 'small') ? styles.moods_container_small : styles.moods_container}`}>

//            <div className={`${(props.moodtags === 'small') ? styles.moods_container_moodtags_small : styles.moods_container_moodtags}`}>
