import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/page/auth/Register";
import Header from "./component/route/Header";
import Code from "./component/codeID/code";
import Home from "./component/page/home";

function App() {
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
