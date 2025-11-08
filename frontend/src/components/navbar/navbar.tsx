import styles from "./navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <a href="#inicio" className={styles.navbar__link}>
          INICIO
        </a>
        <a href="#pedido" className={styles.navbar__link}>
          HACER UN PEDIDO
        </a>
        <a href="#contacto" className={styles.navbar__link}>
          CONTACTO
        </a>
      </div>

      <div className={styles.navbar__promo}>
        PAGANDO EN EFECTIVO 5% DE DESCUENTO
      </div>
    </nav>
  );
}

export default Navbar;
