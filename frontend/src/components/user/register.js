import React from "react";
import { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import '../../styles/register.css';


function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const RegisterUser = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/register`, {
        username,
        password,
      })
      .then((res) => {
        console.log(res);
        window.setTimeout(() => {
          props.history.push("/login/");
          window.history.go(0);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='registerWrapper'>
      <div className='registerContainer'>
        <form onSubmit={RegisterUser}>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="registerFormUsername"
            placeholder="enter username"
          ></input>
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="registerFormPassword"
            placeholder="enter password"
            type="password"
          ></input>
          <button type="submit" className='registerSubmit'>Register</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Register);
