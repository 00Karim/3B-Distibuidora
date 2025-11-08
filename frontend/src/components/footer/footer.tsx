import styles from "./footer.module.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function footer() {
  return (
    <footer>
      <div className={styles.container}>
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-phone me-2"></i> (011) 1234-5678
              </li>
              <li>
                <i className="fab fa-whatsapp me-2"></i> +54 9 11 2345-6789
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i> info@3balimentos.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt me-2"></i> Brasil 977, Bahia
                Blanca
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Horarios</h5>
            <ul className="list-unstyled">
              <li>Lunes a Viernes: 9:00 - 18:00</li>
              <li>Sábados: 9:00 - 13:00</li>
              <li>Domingos: Cerrado</li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5>Redes Sociales</h5>
            <a
              href="https://www.instagram.com/mayorista3b"
              className="social-icon"
            >
              <InstagramIcon sx={{ color: "#ffffffff", fontSize: 40 }} />
            </a>
            <a
              href="https://www.facebook.com/p/Distribuidora-3B-100064159118978/"
              className="social-icon"
            >
              <FacebookIcon sx={{ color: "#ffffffff", fontSize: 40 }} />
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="mb-0">
            &copy; 2025 3B Mayorista. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default footer;
