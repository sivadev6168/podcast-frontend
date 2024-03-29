import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import UserSignup from "./Pages/User/UserSignup";

import UserHome from "./Pages/User/Home";
import Podcaster from "./Pages/Single";

import "./App.css";
import PodcasterSingle from "./Pages/Podcaster/Single";
import UserLogin from "./Pages/User/UserLogin";
import PodcasterLogin from "./Pages/Podcaster/PodcasterLogin";
import PodcasterSignup from "./Pages/Podcaster/PodcasterSignup";
import PodcasterHome from "./Pages/Podcaster/Home";
import PrivateRoutes from "./PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:id" element={<Podcaster />} />
        <Route path="/podcaster/login" element={<PodcasterLogin />} />
        <Route path="/podcaster/signup" element={<PodcasterSignup />} />
        <Route path="/podcaster/:id" element={<PodcasterSingle />} />

        <Route element={<PrivateRoutes roles={["USER", "PODCASTER"]} />}>
          <Route path="/user/home" element={<UserHome />} />
        </Route>

        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />

        <Route element={<PrivateRoutes roles={["PODCASTER"]} />}>
          <Route path="/podcaster/home" element={<PodcasterHome />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
