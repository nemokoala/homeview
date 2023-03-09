import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Admin from "routes/Admin";
import Home from "routes/Home";
import Review from "routes/Review";
import ReviewFac from "routes/ReviewFac";
import Map from "./Map";
import Nav from "./Nav";
import styles from "./Router.module.css";
function AppRouter() {
  return (
    <div className={styles.body}>
      <Router basename={process.env.PUBLIC_URL}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reviewfac" element={<ReviewFac />} />
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
