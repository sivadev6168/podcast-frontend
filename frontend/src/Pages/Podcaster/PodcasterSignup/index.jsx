import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../../../Utils/axios";
import Input from "../../../components/input";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Buttons from "../../../components/button";
import { ToastContainer, toast } from "react-toastify";
import "./Podcastersignup.css";

const PodcasterSignup = () => {
  const [podcasterData, setPodcasterData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    coverImage: "",
  });

  const navigate = useNavigate();

  //REGEX
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{4,}$/;
    return regex.test(password);
  };

  //REGEX END

  const getForm = (e) => {
    const { name, value } = e.target;
    setPodcasterData({ ...podcasterData, [name]: value });
  };

  //for fileupload event
  const OnFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const response = await axios.post("/file/upload", formData);
    setPodcasterData({ ...podcasterData, coverImage: response.data.url });
  };

  const PodcasterSubmit = async (e) => {
    e.preventDefault();
    !validateEmail(podcasterData.email) &&
      toast("Please enter a valid email address.", {
        className: "custom-toast",
        hideProgressBar: false,
        draggable: true,
        progress: 0,
        progressStyle: { background: "#885CD4" },
      });

    !validatePassword(podcasterData.password) &&
      toast(
        "Password must be at least 4 characters long and contain at least one digit and one letter.",
        {
          className: "custom-toast",
          hideProgressBar: false,
          draggable: true,
          progress: 0,
          progressStyle: { background: "#885CD4" },
        }
      );
    await axios.post("/podcaster/signup", podcasterData);
    navigate("/podcaster/login");
  };

  console.log(podcasterData);

  return (
    <div className="podcastersignup-main">
      <motion.h2
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        whileInView={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="user-signup-heading"
      >
        Empower Your Voice with Podcasting
      </motion.h2>
      <div className="form-user">
        <div className="user-signup-form">
          <form>
            <div className="form-flex">
              <Input
                name={"name"}
                label={"Your Name"}
                type={"text"}
                onChange={getForm}
              />
              <Input
                name={"email"}
                label={"Email"}
                type={"text"}
                onChange={getForm}
              />
            </div>

            <div className="form-flex">
              <Input
                name={"password"}
                label={"Password"}
                type={"password"}
                onChange={getForm}
              />

              <Input
                name={"coverImage"}
                label={"Image"}
                type={"file"}
                onChange={OnFileUpload}
              />
            </div>

            <div className="form-flex">
              <Input
                name={"bio"}
                label={"bio"}
                type={"textarea"}
                onChange={getForm}
              />
            </div>
            <Buttons onClick={PodcasterSubmit} className={"submit-btn"}>
              Submit
            </Buttons>
          </form>
        </div>
      </div>
      <motion.p
        animate={{ x: 20 }}
        transition={{ ease: "easeOut", duration: 2 }}
        className="user-signup-des"
      >
        Unleash your creativity and share your stories with the world - sign up
        now and join a vibrant community of podcasters!
      </motion.p>
      <ToastContainer />
    </div>
  );
};

export default PodcasterSignup;
