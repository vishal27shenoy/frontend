import React, { useContext, useEffect, useState } from "react";
import "../css/addnotes.css";
import Card from "./Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";
import { Notes } from "@mui/icons-material";
import { UserContext } from "../context/Context";

import axios from "axios";
const Addnotes = ({ search }) => {
  const [show, setShow] = useState(false);
  const [notes, setNotes] = useState([]);
  const { auth, setAuth } = useContext(UserContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [displaydata, setDisplayData] = useState(false);
  const [checkedit, Setcheckedit] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    userid: auth.id,
  });

  useEffect(() => {
    // setNotes(
    //   notes.filter((item) =>
    //     item.title.toLowerCase().includes(search.toLowerCase())
    //   )
    // );
    // if (search === "") {
    //   getData();
    // }
  }, [search]);
  const [editId, setEditId] = useState("");
  const handleData = async () => {
    console.log(checkedit);
    if (checkedit) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      const response = await axios.put(
        `https://notesapp-ip0q.onrender.com/api/note/${editId}`,
        data
      );
      console.log(response);
      setDisplayData(!displaydata);
      Setcheckedit(false);
      // if(response.) {}
    } else if (data.title && data.description) {
      console.log(data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      const response = await axios.post(
        "https://notesapp-ip0q.onrender.com/api/note/new",
        data
      );
      console.log(response);
      setDisplayData(!displaydata);
    }
    setData({ title: "", description: "", userid: auth.id });
  };

  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    const response = await axios.get(
      "https://notesapp-ip0q.onrender.com/api/getNote/all",
      {
        userid: auth.id,
      }
    );
    setNotes(response.data);
    console.log(response);
  };

  useEffect(() => {
    getData();
  }, [displaydata]);
  return (
    <div className="addnotes_container">
      <Button variant="primary" className="add_notes_btn" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                autoFocus
                onChange={(e) => setData({ ...data, title: e.target.value })}
                value={data.title}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleData();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="card_displaying_in_grid">
        {notes &&
          notes.map((item, index) => {
            if (
              item.delFlag == false &&
              item.title.toLowerCase().includes(search.toLowerCase())
            )
              return (
                <Card
                  title={item.title}
                  description={item.description}
                  cdate={item.date}
                  id={item._id}
                  change={displaydata}
                  changefun={setDisplayData}
                  handleEedit={() => handleShow()}
                  handleDataAtCard={setData}
                  userid={auth.id}
                  checkEditing={Setcheckedit}
                  EditingId={setEditId}
                />
              );
          })}
      </div>
    </div>
  );
};

export default Addnotes;
