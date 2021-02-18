import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import overflowIcon from "../assets/overflow.svg";
import closeIcon from "../assets/close.svg";
import logo from "../assets/logo.svg";
import { isAuthenticated } from "state/selectors/auth";

const menuOptions = [
  {
    text: "Historial",
    url: "/history",
  },
  {
    text: "Cerrar sesión",
    url: "/",
  },
];

function Header() {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!isMenuOpened);
  const closeMenu = () => setMenuOpened(false);
  const isAuth = useSelector(isAuthenticated);

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-4 mb-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" onClick={closeMenu} className="flex flex-row">
            <img
              src={logo}
              className="w-8 mr-4"
              alt="Xambio logo"
              style={{
                filter: "invert(1)",
              }}
            ></img>
            <span className="font-semibold text-4xl tracking-tight">
              Xambio
            </span>
          </Link>
        </div>
        {isAuth && (
          <>
            <div>
              <button
                className="flex items-center px-3 py-2 hover:text-white"
                onClick={toggleMenu}
              >
                <img
                  style={{
                    filter: "invert(1)",
                    height: "16px",
                    width: "16px",
                    objectFit: "contain",
                  }}
                  src={isMenuOpened ? closeIcon : overflowIcon}
                  alt={
                    isMenuOpened
                      ? "Cruz"
                      : "Imagen con tres puntos indicando un menú"
                  }
                ></img>
              </button>
            </div>
            <div className="w-full flex-grow" hidden={!isMenuOpened}>
              <div className="text-sm">
                {menuOptions.map(({ text, url }) => (
                  <Link
                    key={text}
                    to={url}
                    className="block mt-4 ml-auto text-gray-300 hover:text-white mr-4 text-right"
                    onClick={closeMenu}
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
