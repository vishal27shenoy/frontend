import axios from "axios";
import "../css/edited.css";
import { UserContext } from "../context/Context";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const Edited = () => {
  const [displaydata, setDisplayData] = useState(false);
  const [notes, setNotes] = useState([]);
  const { auth, setAuth } = useContext(UserContext);
  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    const response = await axios.get(
      "http://localhost:5000/api/getNote/updated",
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
      `http://localhost:5000/api/note/${ide}`,
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
  return (
    <div className="display_edited_item_in_cart">
      {notes &&
        notes.map((item) => {
          if (item.delFlag == false) {
            return (
              <div className="edited_card_contaner" id={item._id}>
                <div className="edited_title">Title : {item.oldTitle}</div>
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
