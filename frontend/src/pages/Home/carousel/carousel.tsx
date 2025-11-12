import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper.css";

import { Box } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import img1 from "../../../assets/frutos7.jpg";
import img2 from "../../../assets/frutos6.jpg";

import styles from "./carousel.module.css";

function Carousel() {
  return (
    <Box className={styles.carousel}>
      <Swiper
        className={styles.carousel__swiper}
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={600}
        navigation={{
          prevEl: ".carousel__btn--prev",
          nextEl: ".carousel__btn--next",
        }}
      >
        <SwiperSlide>
          <div className={styles.carousel__slide}>
            <img src={img1} />
            <div className={styles.carousel__overlay}>
              <h1 className={styles.carousel__title}>
                Natural, rico y saludable
              </h1>
              <p className={styles.carousel__subtitle}>
                Frutos secos, semillas, frutas deshidratadas y granolas premium.
                Lo mejor de la naturaleza, directo a tu mesa.
              </p>
              <button className={styles.carousel__button}>HACER PEDIDO</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.carousel__slide}>
            <img src={img2} />
            <div className={styles.carousel__overlay}>
              <h1 className={styles.carousel__title}>Tu almacen gourmet</h1>
              <p className={styles.carousel__subtitle}>
                Aceites, legumbres, condimentos, pickles, harinas y más. Todo lo
                que necesitás para cocinar rico, fácil y distinto.
              </p>
              <button className={styles.carousel__button}>HACER PEDIDO</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Botones MUI controlados por Swiper Navigation */}
    </Box>
  );
}

export default Carousel;
