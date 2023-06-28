import axios from "axios";
import "../css/edited.css";
import { UserContext } from "../context/Context";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const Edited = ({ search }) => {
  const [displaydata, setDisplayData] = useState(false);
  const [notes, setNotes] = useState([]);
  const { auth, setAuth } = useContext(UserContext);
  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    const response = await axios.get(
      "https://notesapp-ip0q.onrender.com/api/getNote/updated",
      {
        userid: auth.id,
      }
    );
    setNotes(response.data);
    console.log(response);
  };
  const handleDelete = async (ide) => {
    console.log(ide);
    const delElem = document.getElementById(`${ide}`);
    const response = await axios.delete(
      `https://notesapp-ip0q.onrender.com/api/note/${ide}`,
      {
        userid: auth.id,
      }
    );
    console.log(delElem);
    // delElem.remove();
    getData();
  };
  useEffect(() => {
    getData();
  }, [displaydata]);

  useEffect(() => {}, [search]);
  return (
    <div className="display_edited_item_in_cart">
      {notes.length == 0 ? (
        <div className="mo_notes_display">No History Found</div>
      ) : (
        ""
      )}
      {notes &&
        notes.map((item) => {
          if (
            item.delFlag == false &&
            item.oldTitle.toLowerCase().includes(search.toLowerCase())
          ) {
            return (
              <div
                className="edited_card_contaner"
                id={item._id}
                style={{ backgroundColor: "#f2f2f2" }}
              >
                <div className="edited_title">
                  Old Title : {item.oldTitle} <br /> New : {item.title}
                </div>
                <br />
                <div className="edited_description">
                  Description : {item.oldDescription}
                </div>
                <div className="delete_btn_and_date_container">
                  <div className="updated_date">
                    Updated date : {item.updatedDate.substring(0, 10)}
                  </div>
                  <div
                    className="delete_btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    <DeleteOutlineOutlinedIcon
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Edited;
