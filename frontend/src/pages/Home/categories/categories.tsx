import styles from "./categories.module.css";
import ForestIcon from "@mui/icons-material/Forest";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import BlockIcon from "@mui/icons-material/Block";

function categories() {
  return (
    <section className={styles.categories__container}>
      <h2>Nuestras categorías</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <ForestIcon sx={{ color: "#000000ff", fontSize: 40 }} />
          <h5>Frutos secos, semillas y deshidratados</h5>
          <p>
            Almendras, nueces, castañas y más variedades de frutos seleccionados
            para ti
          </p>
          <button className={styles.card__button}>Ver productos</button>
        </div>
        <div className={styles.card}>
          <BreakfastDiningIcon sx={{ color: "#000000ff", fontSize: 40 }} />
          <h5>Granolas, cereales y barras energéticas</h5>
          <p>
            Granolas premium, cereales clásicos y barras para un día lleno de
            energía
          </p>
          <button className={styles.card__button}>Ver productos</button>
        </div>
        <div className={styles.card}>
          <BlockIcon sx={{ color: "#000000ff", fontSize: 40 }} />
          <h5>Productos SIN TACC para celíacos</h5>
          <p>
            Snacks, galletitas y más aptos para celíacos, sin perder sabor ni
            calidad
          </p>
          <button className={styles.card__button}>Ver productos</button>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <ForestIcon sx={{ color: "#000000ff", fontSize: 40 }} />
          <h5>Frutos secos, semillas y deshidratados</h5>
          <p>
            Almendras, nueces, castañas y más variedades de frutos seleccionados
            para ti
          </p>
          <button className={styles.card__button}>Ver productos</button>
        </div>
        <div className={styles.card}>
          <BreakfastDiningIcon sx={{ color: "#000000ff", fontSize: 40 }} />
          <h5>Granolas, cereales y barras energéticas</h5>
          <p>
            Granolas premium, cereales clásicos y barras para un día lleno de
            energía
          </p>
          <button className={styles.card__button}>Ver productos</button>
        </div>
        <div className={styles.card}>
          <BlockIcon sx={{ color: "#000000ff", fontSize: 40 }} />
          <h5>Productos SIN TACC para celíacos</h5>
          <p>
            Snacks, galletitas y más aptos para celíacos, sin perder sabor ni
            calidad
          </p>
          <button className={styles.card__button}>Ver productos</button>
        </div>
      </div>
    </section>
  );
}

export default categories;
