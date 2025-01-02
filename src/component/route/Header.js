import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_SSO_LOGIN}?serviceURL=${process.env.REACT_APP_SERVICE_URL}`;
  };

  const handleLogout = async () => {
    let res = await dispatch(logoutUser());
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm" sticky="top">
      <Container fluid>
        {/* Logo hoặc tên ứng dụng */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          MyWebsite
        </Navbar.Brand>

        {/* Nút toggle khi trên màn hình nhỏ */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Phần nội dung menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={NavLink} to="/user" className="fw-normal">
              about
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className="fw-normal">
              Register
            </Nav.Link>
            {user && user?.access_Token && (
              <Nav.Link as={NavLink} to="/" className="fw-normal">
                Welcome {user.userName}
              </Nav.Link>
            )}

            {/* Dropdown menu */}
            <NavDropdown
              title="Options"
              id="basic-nav-dropdown"
              align="end" // Canh dropdown sang bên phải
            >
              {user && user?.access_Token ? (
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={handleLogin}>Login</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
