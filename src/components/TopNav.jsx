import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Login from "./Login-Register/Login";
import Register from "./Login-Register/Register";

import classes from "./TopNav.module.css";

const TopNav = (props) => {
  const loggedIn = !!props.cookies.user;
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);
  const [loginWindow, setLoginWindow] = useState(false);
  const [registerWindow, setRegisterWindow] = useState(false);
  const user = props.cookies.user ? props.cookies.user.name : "";
  const [name, setName] = useState(user);

  // const buttonClass = `${classes.btncls} btn btn-primary`;

  const openLogin = () => {
    loginWindow ? setLoginWindow(false) : setLoginWindow(true);
  };

  const openRegister = () => {
    registerWindow ? setRegisterWindow(false) : setRegisterWindow(true);
  };

  // Logout function (Still have to implement clear cookies)
  const logout = () => {
    setName("");
    setIsLoggedIn(false);
    props.removeCookie("user");
  };

  // Classes
  const navbarClass = `${classes.navbar} navbar navbar-expand-lg`;
  const navitemClass = `${classes.navitem} nav-link active`;

  return (
    <nav className={navbarClass}>
      <div className="container-fluid">
        <a className={`${classes.app_name} navbar-brand`} href="/">
          E.Z Scheduler
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName={classes.active}
                className={navitemClass}
                style={{color: 'aqua'}}
              >
                Home
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/my-events"
                    activeClassName={classes.active}
                    className={navitemClass}
                    style={{color: 'aqua'}}
                  >
                    My Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/events/past"
                    activeClassName={classes.active}
                    className={navitemClass}
                    style={{color: 'aqua'}}
                  >
                    Past Events
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/new"
                    activeClassName={classes.active}
                    className={navitemClass}
                    style={{color: 'aqua'}}
                  >
                    New Event
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {!isLoggedIn && (
            <>
              <button className={classes.btn} onClick={openLogin}>
                Login
              </button>
              <button className={classes.btn} onClick={openRegister}>
                Register
              </button>
              {loginWindow && (
                <Login
                  setName={setName}
                  setCookie={props.setCookie}
                  close={openLogin}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
              {registerWindow && (
                <Register
                  setName={setName}
                  setCookie={props.setCookie}
                  close={openRegister}
                  setLogin={setIsLoggedIn}
                />
              )}
            </>
          )}
          {isLoggedIn && (
            <>
              <span className={`${classes.logged_in} nav-item`}>
                Logged in as <strong>{name}</strong>
              </span>
              <Link to="/">
                <button onClick={logout} className={classes.btn}>
                  Log out
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
