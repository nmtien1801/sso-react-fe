import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verify_ssoToken } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Code = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const hasEffectRun = useRef(false); // strictMode chạy 2 lần -> useEffect chạy 2 lần
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!hasEffectRun.current) {
      // Lấy query string từ URL
      const params = new URLSearchParams(window.location.search);
      const ssoToken = params.get("ssoToken"); // Lấy giá trị ssoToken

      // Bạn có thể sử dụng `ssoToken` tại đây
      if (ssoToken) {
        dispatch(verify_ssoToken(ssoToken));
      }
      // Logic here...
      hasEffectRun.current = true;
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      setMessage("Login success");
      navigate("/");
    } else {
      setMessage("Something went wrong");
    }
  }, [isLogin]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3">
          {message}
          {message && (
            <span>
              . Please do login again. Click here to{" "}
              <a
                href={`${process.env.REACT_APP_BACKEND_SSO_LOGIN}?serviceURL=${process.env.REACT_APP_SERVICE_URL}`}
              >
                Login
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Code;
