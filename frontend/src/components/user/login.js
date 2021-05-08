import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/login`, {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("id", res.data._id);
        Cookies.set("LoggedIn", true);

        window.setTimeout(() => {
          props.history.push("/");
          window.history.go(0);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={LoginUser}>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="loginFormUsername"
            placeholder="enter username"
          ></input>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="loginFormPassword"
            placeholder="enter password"
            type="password"
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
