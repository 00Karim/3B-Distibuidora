import styles from "./shop.module.css";

function shop() {
  return (
    <section className={styles.shop}>
      <h1>ARMA TU PEDIDO</h1>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 ">
            <p>hOLA COMO ESTAS DEODMIAsssssssssssssssssssssssODEIO</p>
          </div>
          <div className="col-md-9 bg-dark">
            <div className="card mb-3 bg-light">
              <p>hOLA COMO ESTAS DEODMIAsssssssssssssssssssssssODEIO</p>
            </div>
            <div className="card mb-3 bg-light">
              <p>hOLA COMO ESTAS DEODMIAsssssssssssssssssssssssODEIO</p>
            </div>
            <div className="card mb-3 bg-light">
              <p>hOLA COMO ESTAS DEODMIAsssssssssssssssssssssssODEIO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default shop;
