import { motion } from "framer-motion";
import Input from "../../../components/input";
import Buttons from "../../../components/button";
import { useState } from "react";
import "./userlogin.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../Utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const getForm = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const UserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/login", userInput);
      localStorage.setItem("token", response.data.token);
      navigate("/user/home");
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "An error occurred during login.";
        toast(errorMessage, {
          className: "custom-toast",
          hideProgressBar: false,
          draggable: true,
          progress: 0,
          progressStyle: { background: "#885CD4" },
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast("No response received from the server.", {
          className: "custom-toast",
          hideProgressBar: false,
          draggable: true,
          progress: 0,
          progressStyle: { background: "#885CD4" },
        });
      } else {
        // Request setup error
        console.error("Request setup error:", error.message);
        toast("Error setting up the request.", {
          className: "custom-toast",
          hideProgressBar: false,
          draggable: true,
          progress: 0,
          progressStyle: { background: "#885CD4" },
        });
      }
    }
  };

  console.log(userInput.message);

  return (
    <div className="userlogin-main">
      <motion.h2
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        whileInView={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="user-signup-heading"
      >
        Login
      </motion.h2>
      <div className="form-user">
        <div className="user-signup-form">
          <motion.form
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            whileInView={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <Input
              name={"email"}
              label={"Email"}
              type={"text"}
              onChange={getForm}
            />

            <Input
              name={"password"}
              label={"Password"}
              type={"password"}
              onChange={getForm}
            />

            <Buttons onClick={UserSubmit} className={"submit-btn"}>
              Submit
            </Buttons>
            <motion.a
              whileHover={{
                scale: 1.1,
              }}
              onClick={() => navigate("/user/signup")}
              className="home-a m-sm"
            >
              New User? Signup Here
            </motion.a>
          </motion.form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
