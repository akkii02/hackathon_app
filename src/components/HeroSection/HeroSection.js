import styles from "./HeroSection.module.css";
import PicsArt from "../../assets/icons/PicsArt.svg";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div className={styles.main}>
      <div className={styles.slideOne}>
        <div className={styles.headingSlide}>
          <h1 className={styles.heading}>
            Accelerate Innovation
            <br /> with Global AI Challenges
          </h1>
        </div>
        <div className={styles.slide}>
          <p className={styles.paragraph}>
            AI Challenges at DPhi simulate real-world problems. It is a great
            place to put your AI/Data Science skills to test on diverse datasets
            allowing you to foster learning through competitions.
          </p>
          <button className={styles.btn}><Link to="/create-challenge">Create Challenge</Link></button>
        </div>
      </div>
      <div className={styles.slideTwo}>
        <img src={PicsArt} alt="HeroSectionImg" />
      </div>
    </div>
  );
};
export default HeroSection;
