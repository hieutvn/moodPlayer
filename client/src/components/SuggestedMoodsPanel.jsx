import styles from '../assets/styles/suggestedmoods.module.css';
import SuggestedMoodTag from './SuggestedMoodTag';

function SuggestedMoods() {


    const createSuggestedABC = () => {

        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let value;

        for (let i = 0; i < 1; i++) { //possible.length

            value = possible[i];
        }

        return value;
    }

    const createSuggestedTag = () => {

        return (

            <SuggestedMoodTag />
        );
    }


    return (

        <div className={styles.suggested_moods_container}>

            <span style={{ width: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <span className={styles.suggested_btn}>All</span>
                <span className={styles.suggested_btn}>Last Used</span>
            </span>
            <div className={styles.suggested_moods_wrapper}>
                <div className={`${styles.row_} ${styles[createSuggestedABC]}`}>
                    <span>
                        {createSuggestedABC()}
                        <hr style={{ width: '100%', margin: 0 }} />
                    </span>
                </div>
                <div className={styles.suggested_moods}>

                    {createSuggestedTag()}


                </div>
            </div>
        </div>

    );
}

export default SuggestedMoods;