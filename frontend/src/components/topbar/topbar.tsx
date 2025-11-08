import icon from "../../assets/icon.png";
import styles from "./topbar.module.css";

function topBar() {
  return (
    <div className={styles.topbar}>
      <a href="#inicio" className={styles.img_logo}>
        <img src={icon} />
      </a>
    </div>
  );
}

export default topBar;
