import { motion } from "framer-motion";
import Buttons from "../../components/button";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Modal } from "antd";
import axios from "../../Utils/axios";
import { getId } from "../../Utils";
import { getRoles } from "../../Utils";
import Input from "../../components/input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Podcaster.css";

const Podcaster = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [podcaster, setPodcaster] = useState("");
  const [allDetails, setAllDetails] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [podcastReview, setPodcastReview] = useState([]);
  const [subscribed, setSubscribed] = useState(null);
  const [allSub, setAllSub] = useState("");

  const [review, setReview] = useState({
    userId: getId(),
    review: "",
    podcastId: "",
  });
  const showModal = (episodeId) => {
    setSelectedEpisode(episodeId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const reviewChange = (e) => {
    setReview({ ...review, review: e.target.value });
  };

  const getEpisodes = async () => {
    try {
      const response = await axios.get(`/episode/${id}`);
      setAllDetails({ ep: response.data, podcast: response.data[0].podcastId });
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  const getPodcaster = async () => {
    try {
      const response = await axios.get(
        `/podcaster/${allDetails && allDetails.podcast.podcaster}`
      );
      setPodcaster(response.data);
    } catch (error) {
      console.error("Error fetching podcaster:", error);
    }
  };

  const reviewSubmit = async () => {
    try {
      const podcastId = allDetails?.podcast?._id;
      await axios.post("/review", {
        userId: review.userId,
        review: review.review,
        podcastId: podcastId,
      });
      await getPodcastReview();
    } catch (error) {
      console.error(error.message);
    }
  };

  const getPodcastReview = async () => {
    try {
      const podcastId = allDetails && allDetails.podcast._id;
      const response = await axios.get(`/review/podcast/${podcastId}`);
      setPodcastReview(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const isSubscriber = async () => {
    try {
      if (podcaster && podcaster._id) {
        const response = await axios.get(
          `/subscribe/${getId()}/${podcaster._id}`
        );
        setSubscribed(response.data);
      }
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  const subscribeSubmit = async (id) => {
    console.log(id);
    console.log(getId());

    // Subscribe the user
    await axios.post("/subscribe", {
      podcasterId: podcaster && podcaster._id,
      userId: getId(),
    });

    // Fetch the updated subscription status
    const response = await axios.get(
      `/subscribe/${getId()}/${podcaster && podcaster._id}`
    );
    const updatedSubscription = response.data;

    // Toggle the subscription status
    await axios.post("/subscribe", {
      podcasterId: podcaster && podcaster._id,
      userId: getId(),
      subscribeStatus: !updatedSubscription.subscribeStatus,
    });
    isSubscriber();
  };

  useEffect(() => {
    isSubscriber();
    getEpisodes();
    if (getRoles() === "PODCASTER") {
      const getAllSub = async () => {
        const response = await axios.get(`/subscribe/all/${getId()}`);
        setAllSub(response.data);
      };
      getAllSub();
    }
  }, []);

  useEffect(() => {
    if (allDetails && allDetails.podcast) {
      getPodcaster();
    }
  }, [allDetails]);

  useEffect(() => {
    if (allDetails && allDetails.podcast) {
      getPodcastReview();
    }
  }, [allDetails]);

  console.log(subscribed);

  return (
    <>
      <section>
        <div className="container">
          <div className="player-main">
            <div className="player-details">
              <motion.div
                className="image-podcast-d"
                style={{ position: "relative" }}
              >
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {allDetails && allDetails.podcast.title}
                </motion.h1>
                <motion.img
                  className="player-main-img"
                  src={allDetails && allDetails.podcast.coverImage}
                  alt=""
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />

                <motion.div
                  className="podcaster-details-player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {allDetails && (
                    <div className="p-details">
                      <img
                        onClick={() =>
                          navigate(`/podcaster/${allDetails.podcast.podcaster}`)
                        }
                        src={podcaster && podcaster.coverImage}
                        alt=""
                      />
                      {getRoles() === "PODCASTER" ? (
                        <p>{allSub && allSub.length} Followers</p>
                      ) : (
                        <Buttons
                          className={"subscribe-btn"}
                          onClick={() =>
                            subscribeSubmit(podcaster && podcaster._id)
                          }
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
                  )}

                  <h1>{podcaster && podcaster.name}</h1>
                  <h2>Bio</h2>
                  <p>{podcaster && podcaster.bio}</p>
                </motion.div>
              </motion.div>
              <div className="pod-contents">
                <p>{allDetails && allDetails.podcast.description}</p>
              </div>

              <div className="episode-podcaster">
                <h1>Episodes</h1>
                <div className="episode-single">
                  {allDetails &&
                    allDetails.ep.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => showModal(item._id)}
                        className="ep-box"
                      >
                        <img src="/public/music-player.gif" alt="" />
                        <div className="ep-des">
                          <h4>{`Episode ${i + 1}`}</h4>
                          <h3>{item.episodeTitle}</h3>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <Modal
            className="player-modal"
            title={
              selectedEpisode
                ? allDetails.ep.find(
                    (episode) => episode._id === selectedEpisode
                  ).episodeTitle
                : ""
            }
            open={isModalOpen}
            onCancel={handleCancel}
            width={"100%"}
            footer={null}
          >
            <h5>
              {selectedEpisode
                ? allDetails.ep.find(
                    (episode) => episode._id === selectedEpisode
                  ).podcastId.title
                : ""}
            </h5>
            <AudioPlayer
              layout="stacked"
              showJumpControls={false}
              autoPlay
              src={
                selectedEpisode
                  ? allDetails.ep.find(
                      (episode) => episode._id === selectedEpisode
                    ).audio
                  : ""
              }
              // onPlay={(e) => console.log("onPlay")}
            />
          </Modal>

          <div className="review-main">
            <>
              {getRoles() !== "PODCASTER" ? (
                <>
                  <h2>Write Your Review</h2>
                  <div className="review-input">
                    <Input
                      onChange={reviewChange}
                      name={"review"}
                      type={"textarea"}
                      label={"Review"}
                    />
                    <Buttons onClick={reviewSubmit} className={"review-btn"}>
                      Submit
                    </Buttons>
                  </div>
                </>
              ) : null}
            </>

            <div className="review-box">
              <h2 className="side-heading">Reviews</h2>
              {podcastReview &&
                podcastReview.map((item, i) => (
                  <div key={i} className="reviews">
                    <p>{item.review}</p>
                    <h6>By:{item.userId.name}</h6>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Podcaster;
