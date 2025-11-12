import { useState } from "react";
import MapIcon from "@mui/icons-material/Map";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";

import styles from "./form.module.css";

function contactForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
  };

  return (
    <main>
      <section className={styles.contact__container}>
        <div className={styles.contact__data}>
          <MarkAsUnreadIcon sx={{ color: "#b60000", fontSize: 90 }} />
          <h1>CONTACTO</h1>
          <p>
            Lorem ipsum sjadkasd ajsk djaks dkja skj dsajk djks ajd sakjd sjka
            djkas djkas kas jdk asdjksa jkd ajksd ajks
          </p>
          <p>
            <strong>Horario de atención:</strong> Lunes a viernes de 9 a 13hs y
            de 17 hs a 21hs, sábados de 10 a 13 hs.
          </p>

          <ul className="contacto-lista">
            <li>
              <MapIcon sx={{ color: "#b60000", fontSize: 30 }} /> Brasil 977,
              Bahia Blanca, Buenos Aires
            </li>
            <li>
              <WhatsAppIcon sx={{ color: "#b60000", fontSize: 30 }} /> +54 9 11
              2345-6789
            </li>
            <li>
              <AlternateEmailIcon sx={{ color: "#b60000", fontSize: 30 }} />{" "}
              info@3balimentos.com
            </li>
          </ul>
        </div>
        <div className={styles.contactForm__container}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y Apellido"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              onChange={handleChange}
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              onChange={handleChange}
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              onChange={handleChange}
              required
            />
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              onChange={handleChange}
            />
            <button type="submit">ENVIAR</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default contactForm;
