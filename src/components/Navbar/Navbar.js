import styles from "./Navbar.module.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className={styles.main}>
        <div className={styles.navbar}>
            <Link to="/">
            <img src={Logo} alt="DPhi" />
            </Link>
        </div>
        </div>
    )
};
export default Navbar;