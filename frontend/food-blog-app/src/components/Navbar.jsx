import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import InputForm from "./inputForm";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLogin, setIsLogin] = useState(!token);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setIsLogin(!token);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header className="w-full flex items-center justify-between px-4 py-2 shadow-md fixed top-0 z-50 bg-white">
        <h2 className="text-lg font-bold">Food Blog</h2>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaBars />
        </div>

        {/* Navigation Menu */}
        <ul
          className={`md:flex md:items-center md:space-x-6 ${
            showMenu
              ? "absolute right-4 top-16 bg-white border rounded-md shadow-md p-4 space-y-2"
              : "hidden"
          } md:static md:space-y-0 md:ml-auto`}
        >
          {isAdmin && (
            <li>
              <NavLink to="/admin/users">Users Page</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink>
          </li>
          <li onClick={() => isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink>
          </li>
          <li onClick={checkLogin}>
            <p className="login">
              {isLogin ? "Login" : "Logout"}
              {user?.email ? ` (${user.email})` : ""}
            </p>
          </li>
        </ul>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
