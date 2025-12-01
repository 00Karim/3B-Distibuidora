import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/products";
import type { Product } from "../../types/Product";
import styles from "./productGrid.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import img1 from "../../assets/sin_gluten.png";

function ProductGrid() {
  const [data, setData] = useState<Product[]>([]);
  const [_total, setTotal] = useState(0);
  const [page, _setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts(page)
      .then(({ items, total }) => {
        setData(items);
        setTotal(total);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <div className="skeleton-grid">Cargando…</div>;
  if (error) return <div role="alert">{error}</div>;
  if (data.length === 0) return <p>Sin productos por ahora.</p>;

  return (
    <>
      <div className={styles.product__grid}>
        {data.map((p) => (
          <article key={p._id} className={styles.product__card}>
            <img src={p.image} className={styles.card__img} />
            <div className={styles.card__content}>
              <div className={styles.card__text}>
                <h4>{p.name}</h4>
                <h5>{p.brand}</h5>
                <p>${p.price}</p>
              </div>
              <div className={styles.card__media}>
                <img src={img1} className={styles.glutenfree__img} />
                <button className={styles.card__button}>
                  <AddShoppingCartIcon />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default ProductGrid;
