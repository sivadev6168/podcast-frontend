import { motion } from "framer-motion";
import "./404.css";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-404">
      <h1>404 page not found</h1>
      <motion.img
        className="astr"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 100 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        src="/public/404.png"
        alt=""
      />

      <div className="content-404">
        <img className="globe" src="/public/globe.gif" alt="" />
      </div>
      <button onClick={() => navigate("/")} className="back-2-home">
        Back To Home
      </button>
    </div>
  );
};

export default PageNotFound;
