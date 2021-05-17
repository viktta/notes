import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../../styles/creatednotes.css";

function CreatedNotes(props) {
  const user = localStorage.getItem("id");
  const [userNotes, setUserNotes] = useState([]);
  const [name, setName] = useState(props.match.params.name);
  const [note, setNote] = useState(props.match.params.note);
  const id = props.match.params.id;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3001/api/notes/${user}/${name}`)
        .then((res) => {
          setUserNotes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //pass
    }
  });

  const EditNote = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/api/notes/${id}`, {
        note,
        name,
      })
      .then(() => {
        setEdit(true);
      })
      .then(() => {
        if (edit) {
          window.setTimeout(() => {
            props.history.push("/");
            window.history.go(0);
          }, 2000);
        }
      });
  };

  const OpenPopUp = (e) => {
    document.getElementById("OpenPopUpEdit").style.display = "block";
  };

  const ClosePopUP = (e) => {
    document.getElementById("OpenPopUpEdit").style.display = "none";
  };

  const SeeUserNotes = userNotes.map((i) => {
    return (
      <div key={i._id} className="UserCreatedNotesList">
        <h1>name: {i.name}</h1>
        <p className="UCNp">{i.note}</p>
      </div>
    );
  });

  return (
    <div className="userCreatedNotesWrapper">
      <div className="UserCreatedNotesMain">
        <button id="OpenButton" onClick={OpenPopUp}>
          edit
        </button>
        <div className="UserCreatedNotesContainer">
          <form onSubmit={EditNote} className="creatednotesForm">
            <ul id="OpenPopUpEdit" className="OpenPopUp">
              <li>
                <input
                  className="userCreatedName"
                  name="name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <input
                  className="userCreatedNote"
                  name="note"
                  defaultValue={note}
                  onChange={(e) => setNote(e.target.value)}
                ></input>
              </li>
              <button type="submit" className="userCreatedEdit">
                Edit
              </button>
              <button onClick={ClosePopUP} id="ClosePopUp">
                close
              </button>
            </ul>
          </form>
        </div>
      </div>
        <div className='userSeeNotes'>{SeeUserNotes}</div>
    </div>
  );
}

export default withRouter(CreatedNotes);
