import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useNavigate } from "react-router-dom";
import Buttons from "../../components/button";
import "@splidejs/react-splide/css";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const splideOptions = {
    width: "40%",
    heightRatio: 0.5,
    fixedWidth: "100%",
    fixedHeight: "100%",
    type: "fade",
    autoplay: true,
    interval: 4000,
    arrows: false,
    pagination: false,
    rewind: true,
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <img src="/public/loading.gif" alt="" />
        </div>
      ) : (
        <motion.div className="home-main container">
          <img
            className="background-img-main"
            src="/public/home-bg.jpg"
            alt="homeimg"
          />
          <div className="home-container ">
            <Splide options={splideOptions} aria-label="My Favorite Images">
              <SplideSlide>
                <div className="carousel-item">
                  <img className="img0" src="/home1.png" alt="" />
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className="carousel-item">
                  <img className="img1" src="/home2.png" alt="" />
                </div>
              </SplideSlide>
            </Splide>

            <div className="home-contents">
              <motion.div
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                whileInView={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <h1 className="heading-primary">
                  Discover, Listen, and Engage with Our Podcast Universe
                </h1>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }} // Adjust the transition as needed
            className="flexed-end-div"
          >
            <Buttons
              onClick={() => {
                navigate("/user/login");
              }}
              className={"button-primary home-btn-1"}
            >
              Get Started
            </Buttons>
          </motion.div>
          <motion.div
            className="home-podcaster"
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            whileInView={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            viewport={{ once: true }}
            transition={{ duration: 2.5 }}
          >
            <motion.p
              className="home-a"
              onClick={() => navigate("/podcaster/login")}
              whileHover={{
                scale: 1.01,
                rotate: [0, 2, -2, 0], // Rotate back and forth
              }}
              transition={{ duration: 0.3 }}
            >
              Begin podcasting. Unleash your voice!
              <span>
                <img src="/public/right-white.gif" alt="right-arrow" />
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
