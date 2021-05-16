import React from "react";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import '../../styles/create.css';


function Create(props) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const user = localStorage.getItem("id");

  const userCreateNote = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/notes`, {
        name,
        note,
        user,
      })
      .then((res) => {
        console.log(res);
        window.setTimeout(() => {
          props.history.push("/");
          window.history.go(0);
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="createNoteWrapper">
      <div className="createNoteContainer">
        <form onSubmit={userCreateNote}>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="userCreateName"
            placeholder="enter name"
          ></input>
          <textarea
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="userCreateNote"
            placeholder="enter note"
          ></textarea>
          <button type="submit" className="userCreateSubmit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Create);
