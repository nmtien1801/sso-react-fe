import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./component/page/auth/Register";
import Header from "./component/route/Header";
import Code from "./component/codeID/code";
import Home from "./component/page/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { doGetAccount } from "./component/redux/authSlice";
import { ThreeDots } from "react-loader-spinner";
import User from "./component/page/user/user";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(true); // loading khi verify ssoToken
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const fetchDataAccount = async () => {
    if (!user || !user?.access_Token) {
      setLoading(true);
      await dispatch(doGetAccount()); // Gọi API
      setLoading(false); // Dừng loading
    } else {
      setLoading(false); // Dừng loading nếu user đã có access_Token
    }
  };

  useEffect(() => {
    fetchDataAccount();
  }, [dispatch, user?.access_Token]); // Chỉ phụ thuộc vào dispatch và access_Token

  // show loading UI khi đang verify ssoToken
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <ThreeDots height="80" width="80" color="#3498db" />
      </div>
    );
  }

  console.log("user", user);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code" element={<Code />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user"
          element={isLoggedIn ? <User /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
