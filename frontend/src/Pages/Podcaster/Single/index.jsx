import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./podcasterSingle.css";
import Buttons from "../../../components/button";
import { motion } from "framer-motion";
import { getId, getRoles } from "../../../Utils/index";
import { useEffect, useState } from "react";
import axios from "../../../Utils/axios";
import { useNavigate, useParams } from "react-router-dom";

const PodcasterSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcaster, setPodcaster] = useState("");
  const [podcasts, setPodcasts] = useState([""]);
  const [subscribed, setSubscribed] = useState(null);
  const [allSub, setAllSub] = useState("");

  const getPodcaster = async () => {
    try {
      const response = await axios.get(`/podcaster/${id}`);
      setPodcaster(response.data);
    } catch (error) {
      console.error("Error fetching podcaster:", error);
    }
  };

  const getAllPodcasts = async () => {
    const response = await axios.get(`/podcast/podcaster/${id}`);
    setPodcasts(response.data);
  };

  const getPodcasterSingle = (id) => {
    navigate(`/podcast/${id}`);
  };

  const isSubscriber = async () => {
    try {
      const response = await axios.get(`/subscribe/${getId()}/${id}`);
      setSubscribed(response.data);
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  const subscribeSubmit = async (id) => {
    console.log(id);
    console.log(getId());

    // Subscribe the user
    await axios.post("/subscribe", {
      podcasterId: id,
      userId: getId(),
    });

    // Fetch the updated subscription status
    const response = await axios.get(`/subscribe/${getId()}/${id}`);
    const updatedSubscription = response.data;

    // Toggle the subscription status
    await axios.post("/subscribe", {
      podcasterId: id,
      userId: getId(),
      subscribeStatus: !updatedSubscription.subscribeStatus,
    });
    isSubscriber();
  };

  useEffect(() => {
    getPodcaster();
    getAllPodcasts();
    isSubscriber();
    if (getRoles() === "PODCASTER") {
      const getAllSub = async () => {
        const response = await axios.get(`/subscribe/all/${getId()}`);
        setAllSub(response.data);
      };
      getAllSub();
    }
  }, []);

  console.log(subscribed, "subscribed");

  return (
    <div className="podcaster-single">
      <div className="container">
        <div className="podcaster-single-banner">
          <section>
            <motion.div
              className="podcaster-details-player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="p-details-c">
                <img src={podcaster && podcaster.coverImage} alt="" />
                {getRoles() === "PODCASTER" ? (
                  <p>{allSub && allSub.length} Followers</p>
                ) : (
                  <Buttons
                    className={"subscribe-btn"}
                    onClick={() => subscribeSubmit(podcaster && podcaster._id)}
                  >
                    {(subscribed && subscribed.subscribeStatus) || null
                      ? "Unsubscribe"
                      : "Subscribe"}
                  </Buttons>
                )}
                <>
                  {getRoles() != "PODCASTER" ? (
                    <div className="social">
                      <a href="#">
                        <span>Facebook</span>
                      </a>
                      <a href="#">
                        <span>Twitter</span>
                      </a>
                      <a href="#">
                        <span>Insta</span>
                      </a>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              </div>

              <h1>{podcaster && podcaster.name}</h1>
              <h2>Bio</h2>
              <p>{podcaster && podcaster.bio}</p>
            </motion.div>
          </section>
          <section className="section-spacing">
            <h1 className="side-heading">Collections</h1>
            <Splide
              options={{
                drag: "free",
                pagination: false,
                perPage: Math.min(4, podcasts.length),
                arrows: false,
                lazyLoad: "sequential",
              }}
            >
              {podcasts &&
                podcasts.map((item, i) => (
                  <SplideSlide key={i}>
                    <div className="collection-box">
                      <img
                        onClick={() => getPodcasterSingle(item._id)}
                        src={item.coverImage}
                        alt=""
                      />
                      <div className="collection-details">
                        <h2>{item.title}</h2>
                      </div>
                      <div className="float float-1"></div>
                    </div>
                  </SplideSlide>
                ))}
            </Splide>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PodcasterSingle;
