import React from "react";
import { useState, useEffect } from "react";
import "../../styles/links.css";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";

function UserNotes() {
  const [userNotes, setUserNotes] = useState([]);
  const user = localStorage.getItem("id");
  const notes = localStorage.getItem("notes");

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/api/notes/${user}`)
        .then((res) => {
          setUserNotes(res.data);
          localStorage.setItem("notes", true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //pass
    }
  }, [userNotes]);

  const a = userNotes.map((i) => {
    return i._id;
  });

  const n1 = userNotes.map((i) => {
    return (
      <div key={i._id} className="UserNotes">
        <div>
          <Link
            to={{
              pathname: `/usercreatednotes/${i.user}/${i.name}/${i.note}/${i._id}`,
              state: { getn: a },
            }}
            onClick={() => {
              window.setTimeout(() => {
                window.history.go(0);
              }, 1);
            }}
            className="UserNotesList"
          >
            <h5 className="UserNotesH5">{i.name}</h5>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <BrowserRouter>
      <div className='appNotesWrapper'>
        <div className="appNotesContainer">
          {notes ? (
            <div className="UserNotesList">{n1}</div>
          ) : (
            <h1>Login or Register to create notes</h1>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default UserNotes;
