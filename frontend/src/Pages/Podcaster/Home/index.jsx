import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, Popover } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../Utils/axios";
import Input from "../../../components/input";
import Buttons from "../../../components/button";
import { getId } from "../../../Utils";
import { motion } from "framer-motion";
import "./podcasterHome.css";

const PodcasterHome = () => {
  const navigate = useNavigate();

  const [podcaster, setPodcaster] = useState("");
  const [podcastByPodcaster, setPodcastByPodcaster] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [podcastInput, setPodcastInput] = useState({
    title: "",
    description: "",
    coverImage: "",
    podcaster: getId(),
  });
  const [episodeInput, setEpisodeInput] = useState({
    episodeTitle: "",
    audio: "",
    podcastId: "",
  });
  //REGEX

  const validateTitle = (title) => {
    return /^[^\s]+(\s+[^\s]+)*$/.test(title);
  };

  const validateDescription = (description) => {
    return /^[^\s]+(\s+[^\s]+)*$/.test(description);
  };

  const validateCoverImage = (coverImage) => {
    const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    return /^https?:\/\/\S+$/.test(coverImage) && imageRegex.test(coverImage);
  };

  const validateAudio = (audio) => {
    const audioRegex = /\.(mp3|wav|ogg)$/i;
    return audioRegex.test(audio);
  };

  //REGEX END

  const getPodcastDetails = (e) => {
    const { name, value } = e.target;
    setPodcastInput({ ...podcastInput, [name]: value });
  };

  const onEpisodeDetails = (e) => {
    const { name, value } = e.target;
    setEpisodeInput({ ...episodeInput, [name]: value });
  };

  const onFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post("file/upload", formData);
    setPodcastInput({ ...podcastInput, coverImage: response.data.url });
  };

  //POSTING PODCAST WITH PODCASTERID
  const podcastSubmit = async () => {
    if (!validateTitle(podcastInput.title)) {
      toast("Please enter Title", {
        className: "custom-toast",
        hideProgressBar: false,
        draggable: true,
        progress: 0,
        progressStyle: { background: "#885CD4" },
      });
      return;
    }
    if (!validateDescription(podcastInput.description)) {
      toast("Please enter Description", {
        className: "custom-toast",
        hideProgressBar: false,
        draggable: true,
        progress: 0,
        progressStyle: { background: "#885CD4" },
      });
      return;
    }
    if (!validateCoverImage(podcastInput.coverImage)) {
      toast("Please enter Image format only", {
        className: "custom-toast",
        hideProgressBar: false,
        draggable: true,
        progress: 0,
        progressStyle: { background: "#885CD4" },
      });
      return;
    }

    try {
      const response = await axios.post("/podcast/", podcastInput);
      toast("Podcast added to podcaster successfully", {
        /* Toast options */
      });
      // Optionally update state or perform any other actions upon success
    } catch (error) {
      console.error("Error adding podcast to podcaster:", error);
      // Handle error, show toast message, etc.
    }
    getPodcastByPodcaster();
  };

  const onEpisodeSubmit = async (id) => {
    await axios.post("/episode", { ...episodeInput, podcastId: id });
    toast("Episode Added", {
      className: "custom-toast",
      hideProgressBar: false,
      draggable: true,
      progress: 0,
      progressStyle: { background: "#885CD4" },
    });
  };

  const deletePodcast = async (id) => {
    await axios.delete(`/podcast/delete/${id}`);
    getPodcastByPodcaster();
    toast("Podcast Deleted", {
      className: "custom-toast",
      hideProgressBar: false,
      draggable: true,
      progress: 0,
      progressStyle: { background: "#885CD4" },
    });
  };

  const handleOpenChange = (podcastId) => {
    setOpen(podcastId);
  };

  const getPodcastByPodcaster = async () => {
    const response = await axios.get(`/podcast/podcaster/${getId()}`);
    setPodcastByPodcaster(response.data);
    setLoading(false);
  };

  const getPodcaster = async () => {
    const response = await axios.get(`/podcaster/${getId()}`);
    setPodcaster(response.data);
  };

  const onEpisodeFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post("/file/upload", formData);
    setEpisodeInput({ ...episodeInput, audio: response.data.url });
  };

  const getSinglePodcast = (id) => {
    navigate(`/podcast/${id}`);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getPodcaster();
    getPodcastByPodcaster();
  }, []);

  return (
    <div className="podcasterhome-main">
      <div className="user-nav">
        <p>Hello {podcaster && podcaster.name}</p>
        {!podcaster ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} />
        ) : (
          <img src={podcaster.coverImage} alt="" />
        )}
        <motion.i
          whileHover={{ scale: 1.2 }}
          title="Logout"
          className="fa fa-sign-out"
          aria-hidden="true"
          onClick={Logout}
        ></motion.i>
      </div>

      <div className="container">
        <section>
          <h1 className="side-heading">Your Podcasts</h1>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              {podcastByPodcaster && podcastByPodcaster.length > 0 ? (
                <div className="podcaster-box-main">
                  {podcastByPodcaster.map((podcast, index) => (
                    <div key={podcast._id} className="box-box">
                      <div className="box-contents p-box">
                        <img
                          onClick={() => getSinglePodcast(podcast._id)}
                          src={podcast.coverImage}
                          alt=""
                        />
                        <div className="p-actions">
                          <Popover
                            content={
                              <>
                                <Input
                                  name={"episodeTitle"}
                                  onChange={onEpisodeDetails}
                                  type={"text"}
                                  label={"Episode Title"}
                                />
                                <Input
                                  name={"audio"}
                                  label={"Upload Episode"}
                                  onChange={onEpisodeFileUpload}
                                  type={"file"}
                                />
                                <Buttons
                                  className={"e-submit"}
                                  onClick={() => onEpisodeSubmit(podcast._id)}
                                >
                                  Add
                                </Buttons>
                              </>
                            }
                            title="Add New Episodes"
                            trigger="click"
                            open={open === podcast._id}
                            onOpenChange={() => handleOpenChange(podcast._id)}
                          >
                            <motion.i
                              whileHover={{ scale: 1.5, color: "#351148" }}
                              whileTap={{ scale: 0.8 }}
                              className="fa fa-plus action-icon"
                              aria-hidden="true"
                              title="Add Episode"
                            ></motion.i>
                          </Popover>
                          <motion.i
                            whileHover={{ scale: 1.5, color: "#351148" }}
                            whileTap={{ scale: 0.8 }}
                            className="fa fa-trash action-icon"
                            aria-hidden="true"
                            title="Delete Podcast"
                            onClick={() => deletePodcast(podcast._id)}
                          ></motion.i>
                        </div>
                        <h2>{podcast.title}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                  No podcasts found
                </h2>
              )}
            </>
          )}
        </section>
        <div className="add-podcast">
          <h1 className="side-heading">Add New Podcast</h1>
          <Input
            name={"title"}
            label={"Podcast Title"}
            type={"text"}
            onChange={getPodcastDetails}
          />
          <Input
            name={"description"}
            label={"Description"}
            type={"textarea"}
            onChange={getPodcastDetails}
          />
          <Input
            name={"coverImage"}
            label={"Add Cover Image"}
            type={"file"}
            onChange={onFileUpload}
          />
          <Buttons onClick={podcastSubmit} className={"submit-btn"}>
            Submit
          </Buttons>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PodcasterHome;
