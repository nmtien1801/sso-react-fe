import React, { useEffect, useState, useRef, use } from "react";
import { useSelector, useDispatch } from "react-redux";

const Home = (props) => {
  const user_Info = useSelector((state) => state.auth.user_Info);

  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (user_Info) {
      setUser(user_Info);
    }
  }, [user_Info]);

  
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
