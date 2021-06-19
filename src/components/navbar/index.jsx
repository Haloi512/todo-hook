import React, { useState, useEffect } from "react";
import Logo from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [navColor, setnavColor] = useState("transparent");
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("rgb(239, 241, 245)") : setnavColor("#fff");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <div
      className="navbar"
      data-test="navbar"
      style={{
        backgroundColor: navColor,
        transition: "all 1s",
      }}
    >
      <img className="logo" data-test="logo" src={Logo} />
      <div className="group-link">
        <Link className="group-link__home" to="/">
          Home
        </Link>
        <Link className="group-link__list" to="/todo-list">
          Todo
        </Link>
      </div>
    </div>
  );
};
