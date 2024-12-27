import React, { useEffect, useState, useRef } from "react";
import { check_ssoToken } from "../service/authService";
import { useNavigate } from "react-router-dom";

const Code = () => {
  const navigate = useNavigate();
  const hasEffectRun = useRef(false); // strictMode chạy 2 lần -> useEffect chạy 2 lần
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!hasEffectRun.current) {
      // Lấy query string từ URL
      const params = new URLSearchParams(window.location.search);
      const ssoToken = params.get("ssoToken"); // Lấy giá trị ssoToken

      // Bạn có thể sử dụng `ssoToken` tại đây
      if (ssoToken) {
        check_ssoToken(ssoToken)
          .then((res) => {
            if (res && res.EC === 0) {
              console.log(res.DT);
              setMessage("Login success");
              navigate("/")
            } else {
              setMessage(res.EM || "Something went wrong");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            setMessage("An error occurred during login");
          });
      }
      // Logic here...
      hasEffectRun.current = true;
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3">
          {message}
          {message && (
            <span>
              . Please do login again. Click here to{" "}
              <a
                href={`${process.env.REACT_APP_BACKEND_SSO}?serviceURL=${process.env.REACT_APP_SERVICE_URL}`}
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
