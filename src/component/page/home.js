import React, { useEffect, useState, useRef, use } from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = (props) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
