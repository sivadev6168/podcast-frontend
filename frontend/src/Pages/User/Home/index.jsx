import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { motion } from "framer-motion";
import "./userhome.css";
import { getId, getRoles } from "../../../Utils";
import { useEffect, useState } from "react";
import axios from "../../../Utils/axios";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [podcaster, setPodcaster] = useState("");
  const [podcasts, setPodcasts] = useState("");
  const [latestPodcasts, setLatestPodcasts] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchedPodcasat, setSearchedPodcast] = useState([]);

  const getUser = async () => {
    const response = await axios.get(`/user/${getId()}`);
    setUser(response.data);
  };

  const getPodcaster = async () => {
    const response = await axios.get("/podcaster");
    setPodcaster(response.data);
  };

  const getAllPodcasts = async () => {
    const response = await axios.get("/podcast");
    setPodcasts(response.data);
  };

  const getSinglePodcast = async (id) => {
    navigate(`/podcast/${id}`);
  };

  const getSinglePodcaster = (id) => {
    navigate(`/podcaster/${id}`);
  };

  const getLatestPodcasts = async () => {
    const response = await axios.get("/podcast/latest");
    setLatestPodcasts(response.data);
  };

  const searchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const searchSubmit = async () => {
    const response = await axios.get(`/podcast/podcastsearch/${searchInput}`);
    setSearchedPodcast(response.data);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getUser();
    getPodcaster();
    getAllPodcasts();
    getLatestPodcasts();
  }, []);

  console.log(searchedPodcasat);
  return (
    <div className="userhome-main">
      <div className="user-nav">
        <p>Hello {user && user.name}</p>
        <motion.i
          whileHover={{ scale: 1.2 }}
          title="Logout"
          class="fa fa-sign-out"
          aria-hidden="true"
          onClick={Logout}
        ></motion.i>
      </div>
      <div className="userhome-contents">
        <section>
          <div className="container">
            <div className="search-box">
              <h1 className="user-home-h">find your best podcasts</h1>
              <div className="user-home-search">
                <input
                  onChange={searchChange}
                  name="search"
                  type="text"
                  placeholder="Search podcasts"
                />
                <i
                  onClick={searchSubmit}
                  className="search-icon fa fa-search"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="show-search-box">
              {searchedPodcasat &&
                (Array.isArray(searchedPodcasat) ? (
                  searchedPodcasat.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="sm-box"
                      key={i}
                      onClick={() => getSinglePodcast(item._id)}
                    >
                      <img src={item.coverImage} alt="" />
                      <h6>{item.title}</h6>
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="centered-res"
                  >
                    {searchedPodcasat.message}
                  </motion.p>
                ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="user-home-box-main"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Dive into the sound of ideas with our podcast – where every word
                creates a melody for your mind!
              </motion.h1>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="home-main-img"
                src="/public/banner1.jpg"
                alt=""
              />
            </motion.div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container">
            <h1 className="side-heading">Top Rated Storytellers</h1>

            <Splide
              options={{
                type: "loop",
                drag: "free",
                pagination: false,
                perPage: 8,
                breakpoints: {
                  768: {
                    perPage: 3,
                  },
                },
                arrows: false,
                lazyLoad: "sequential",
              }}
            >
              {podcaster &&
                podcaster.map((item, i) => (
                  <SplideSlide key={i}>
                    <div className="podcaster-box">
                      <img
                        onClick={() => getSinglePodcaster(item._id)}
                        src={item.coverImage}
                        alt=""
                      />
                      <h3 className="podcaster-name">{item.name}</h3>
                    </div>
                  </SplideSlide>
                ))}
            </Splide>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container">
            <div className="latest-home-user">
              <h1 className="side-heading">Trending Soundscapes</h1>
              <Splide
                options={{
                  type: "loop",
                  drag: "free",
                  pagination: false,
                  perPage: 5,
                  breakpoints: {
                    768: {
                      perPage: 1,
                    },
                  },
                  arrows: false,
                  lazyLoad: "sequential",

                  autoScroll: {
                    pauseOnHover: true,
                    pauseOnFocus: false,
                    rewind: false,
                    speed: 1,
                  },
                }}
                extensions={{ AutoScroll }}
              >
                {podcasts &&
                  podcasts.map((item, i) => (
                    <SplideSlide key={i}>
                      <div className="box-box">
                        <div className="box-contents">
                          <i className="fa-solid fa-play play-btn"></i>
                          <img
                            onClick={() => getSinglePodcast(item._id)}
                            src={item.coverImage}
                            alt=""
                          />
                          <h2 className="slider-podcaster">{item.title}</h2>
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
              </Splide>
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container">
            <div className="home-box1">
              <div className="home-box-texts">
                <h2>Embark on a Podcasting Adventure</h2>
                <p>Dive into a world of stories, insights, and inspiration.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container">
            <h1 className="side-heading">Latest</h1>
            <div className="latest-box">
              {latestPodcasts &&
                latestPodcasts.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => getSinglePodcast(item._id)}
                    className="latest-box-box"
                  >
                    <img
                      src={item.coverImage}
                      alt="economy"
                      className="latest-box-image"
                    />
                    <div className="latest-box-content">
                      <h2>{item.title}</h2>
                      <p>
                        {item.description.split(" ").slice(0, 15).join(" ")}
                        {item.description.split(" ").length > 15 ? "..." : ""}
                      </p>
                      <h4 className="author-latest">
                        <span>
                          <img
                            className="author-s-img"
                            src={item.podcaster.coverImage}
                            alt="author"
                          />
                        </span>
                        {item.podcaster.name}
                      </h4>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserHome;
