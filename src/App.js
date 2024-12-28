import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/page/auth/Register";
import Header from "./component/route/Header";
import Code from "./component/codeID/code";
import Home from "./component/page/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { doGetAccount } from "./component/redux/authSlice";
import { ThreeDots } from "react-loader-spinner";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user_Info);
  const [loading, setLoading] = useState(true); // loading khi verify ssoToken
  const isLogin = useSelector((state) => state.auth.isLogin);

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

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/code" element={<Code />} />
      </Routes>
    </Router>
  );
}

export default App;
