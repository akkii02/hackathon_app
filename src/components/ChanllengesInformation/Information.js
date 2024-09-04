import styles from "./Information.module.css";
import LogoOne from "../../assets/icons/carbon_notebook-reference.svg";
import LogoTwo from "../../assets/icons/Vector.svg";
import LogoThree from "../../assets/icons/Robot.svg";
import LogoFour from "../../assets/icons/IdentificationCard.svg";

const Information = () => {
    return (
        <div className={styles.main}>
            <h1>Why Participate in <span className={styles.colorText}>AI Challenges?</span></h1>
            <div className={styles.cardContainer}>
                {[
                    { imgSrc: LogoOne, heading: "Prove your skills", paragraph: "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions." },
                    { imgSrc: LogoTwo, heading: "Learn from community", paragraph: "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them." },
                    { imgSrc: LogoThree, heading: "Challenge yourself", paragraph: "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder." },
                    { imgSrc: LogoFour, heading: "Earn recognition", paragraph: "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards." },
                ].map((card, index) => (
                    <div key={index} className={styles.card}>
                        <img src={card.imgSrc} alt={`Icon representing ${card.heading}`} className={styles.icon} />
                        <div className={styles.cardContent}>
                            <h3 className={styles.heading}>{card.heading}</h3>
                            <p className={styles.paragraph}>{card.paragraph}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Information;
