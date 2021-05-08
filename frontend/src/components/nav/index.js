import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Register from "../user/register";
import Login from "../user/login";
import Create from "../create/index";
import UserNotes from "../links/index";
import "../../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbarWrapper">
      <BrowserRouter>
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

        <Switch>
          <Route exact path="/register">
            <Register />{" "}
          </Route>
          <Route exact path="/create">
            <Create />{" "}
          </Route>
          <Route exact path="/" />
          <Route exact path="/login">
            <Login />{" "}
          </Route>
          <Route exact path="/usercreatednotes/:user/:name/:note/:id">
            <UserNotes />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Navbar;
