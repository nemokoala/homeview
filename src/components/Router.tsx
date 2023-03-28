import { useState } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Admin from "routes/Admin";
import Home from "routes/Home";
import Review from "routes/Review";
import ReviewDetail from "routes/ReviewDetail";
import ReviewFac from "routes/ReviewFac";
import Map from "./LegacyMapContainer";
import Nav from "./Nav";
import styles from "./Router.module.css";
function AppRouter({ reviewData, setReviewData }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.body}>
      <Router>
        <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Home reviewData={reviewData} />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/review"
            element={<Review reviewData={reviewData} searchTerm={searchTerm} />}
          />
          <Route
            path="/review/:id"
            element={<ReviewDetail reviewData={reviewData} />}
          />
          <Route
            path="/reviewfac"
            element={
              <ReviewFac
                reviewData={reviewData}
                setReviewData={setReviewData}
              />
            }
          />
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
