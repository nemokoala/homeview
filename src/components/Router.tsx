import { useState } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Admin from "routes/Admin";
import Home from "routes/Home";
import Review from "routes/Review";
import ReviewDetail from "routes/ReviewDetail";
import ReviewFac from "routes/ReviewFac";
import Map from "./LegacyMapContainer";
import Nav from "./Nav";
import styles from "./Router.module.css";
import BackButton from "./BackButton";
import Register from "routes/Register";
import Profile from "routes/Profile";
import { useSelector } from "react-redux";

function AppRouter({ reviewData, setReviewData }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const session = useSelector((state: any) => state.userSet.session);
  return (
    <div className={styles.body}>
      <Router>
        <Nav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <BackButton />

        <Routes>
          <Route path="/" element={<Home reviewData={reviewData} />} />
          <Route
            path="/admin"
            element={
              <Admin reviewData={reviewData} setReviewData={setReviewData} />
            }
          />
          <Route
            path="/review"
            element={
              <Review
                reviewData={reviewData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
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

          {session ? (
            <Route path="/api/profile" element={<Profile />} />
          ) : (
            <>
              <Route path="/api/join" element={<Register />} />
              <Route path="/api/login" element={<Register />} />
            </>
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
