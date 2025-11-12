import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <Link to="/" className={styles.navbar__link}>
          INICIO
        </Link>
        <Link to="/pedido" className={styles.navbar__link}>
          HACER UN PEDIDO
        </Link>
        <Link to="/contacto" className={styles.navbar__link}>
          CONTACTO
        </Link>
      </div>
      <div className={styles.navbar__promo}>
        PAGANDO EN EFECTIVO 5% DE DESCUENTO
      </div>
    </nav>
  );
}

export default Navbar;
