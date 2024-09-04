import styles from "./InfoBar.module.css";
import IconOne from "../../assets/icons/Icon1.svg";
import IconTwo from "../../assets/icons/Icon2.svg";
import IconThree from "../../assets/icons/Icon3.svg";

const InfoBar = () => {
    return <div className={styles.main}>
        <div className={styles.card}>
            <img src={IconOne} alt="Logo" />
            <div className={styles.container}>
                <h3 className={styles.heading}>300K+</h3>
                <p className={styles.paragraph}>AI model submissions</p>
            </div>
        </div>
        <span></span>
        <div className={styles.card}>
            <img src={IconTwo} alt="Logo" />
            <div className={styles.container}>
                <h3 className={styles.heading}>50K+</h3>
                <p className={styles.paragraph}>Data Scientists</p>
            </div>
        </div>
        <span></span>
        <div className={styles.card}>
            <img src={IconThree} alt="Logo" />
            <div className={styles.container}>
                <h3 className={styles.heading}>100+</h3>
                <p className={styles.paragraph}>AI Challenges hosted</p>
            </div>
        </div>
    </div>
};
export default InfoBar;