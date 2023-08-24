import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

export default function NavBar({ userData, logout }) {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top top-0 ${styles.bgNavBar}`}
      >
        <div className="container">
          <Link className="navbar-brand" to="home">
            Noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="movies">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="tvshows">
                    Tv Shows
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="people">
                    People
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item  ">
                <i className=" me-3 fa-brands fa-facebook-f"></i>
                <i className=" me-3 fa-brands fa-twitter"></i>
                <i className=" me-3 fa-brands fa-instagram"></i>
                <i className=" me-3 fa-brands fa-youtube"></i>
              </li>
              {userData ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="btn btn-outline-info mx-2"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="">
                      Login
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
