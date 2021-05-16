import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Register from "../user/register";
import Login from "../user/login";
import Create from "../create/index";
import CreatedNotes from "../appnotes/creatednotes";
import "../../styles/navbar.css";
import Cookies from "js-cookie";

function Navbar(props) {
  const IsLoggedIn = localStorage.getItem("id");

  const Logout = (e) => {
    Cookies.remove("LoggedIn");
    localStorage.removeItem("id");
    localStorage.removeItem("notes");
    window.setTimeout(() => {
      window.history.go(0);
    }, 1000);
  };

  return (
    <BrowserRouter>
      {IsLoggedIn ? (
        <div className="navbarWrapper">
          <div className="navbarContainer">
            <ul>
              <li>
                <Link to="/" className="linkHome">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="linkCreate">
                  Create
                </Link>
              </li>
              <li>
                <Link to="" className="linkLogout" onClick={Logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbarWrapper">
          <div className="navbarContainer">
            <ul>
              <li>
                <Link to="/" className="linkHome">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="linkCreate">
                  Create
                </Link>
              </li>
              <li>
                <Link to="/register" className="linkRegister">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="linkLogin">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/" />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/usercreatednotes/:user/:name/:note/:id">
          <CreatedNotes />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Navbar;
