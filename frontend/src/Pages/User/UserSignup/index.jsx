import { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../../components/input";
import Buttons from "../../../components/button";
import "./usersignup.css";
import axios from "../../../Utils/axios";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  //REGEX
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{4,}$/;
    return regex.test(password);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };
  //REGEX end

  const getForm = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const userSubmit = async (e) => {
    e.preventDefault();

    // Validate email, password, and phone
    if (!validateEmail(userInput.email)) {
      toast("Please enter a valid email address.", {
        className: "custom-toast",
        hideProgressBar: false,
        draggable: true,
        progress: 0,
        progressStyle: { background: "#885CD4" },
      });
      return;
    }
    if (!validatePassword(userInput.password)) {
      toast(
        "Password must be at least 8 characters long and contain at least one digit and one letter.",
        {
          className: "custom-toast",
          hideProgressBar: false,
          draggable: true,
          progress: 0,
          progressStyle: { background: "#885CD4" },
        }
      );
      return;
    }
    if (!validatePhone(userInput.phone)) {
      toast("Invalid Phone Number", {
        className: "custom-toast",
        hideProgressBar: false,
        draggable: true,
        progress: 0,
        progressStyle: { background: "#885CD4" },
      });
      return;
    }

    try {
      const response = await axios.post("/user/signup", userInput);
      // Check if signup was successful
      if (response.status === 200) {
        toast("New User Added", {
          className: "custom-toast",
          hideProgressBar: false,
          draggable: true,
          progress: 0,
          progressStyle: { background: "#885CD4" },
        });
        navigate("/user/login");
      }
    } catch (error) {
      if (error.response) {
        // Handle response errors
        if (
          error.response.status === 409 &&
          error.response.data.message === "Email already taken"
        ) {
          toast("Email already taken", {
            className: "custom-toast",
            hideProgressBar: false,
            draggable: true,
            progress: 0,
            progressStyle: { background: "#885CD4" },
          });
        } else {
          // Handle other response errors
          toast("An error occurred during signup.", {
            className: "custom-toast",
            hideProgressBar: false,
            draggable: true,
            progress: 0,
            progressStyle: { background: "#885CD4" },
          });
        }
      } else {
        // Handle other errors
        toast("Error occurred during signup.", {
          className: "custom-toast",
          hideProgressBar: false,
          draggable: true,
          progress: 0,
          progressStyle: { background: "#885CD4" },
        });
      }
    }
  };

  console.log(userInput);

  return (
    <div className="usersignup-main">
      <motion.h2
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        whileInView={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="user-signup-heading"
      >
        "Join the Podcast Community"
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
                name={"phone"}
                label={"phone"}
                type={"text"}
                onChange={getForm}
              />
            </div>

            <Buttons onClick={userSubmit} className={"submit-btn"}>
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
        Unlock a world of audio delights – sign up now and dive into the podcast
        experience with our vibrant community.
      </motion.p>
      <ToastContainer />
    </div>
  );
};

export default UserSignup;
