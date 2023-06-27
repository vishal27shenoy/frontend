import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/Context";
import "../css/edited.css";
const Deleted = () => {
  const { auth, setAuth } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    const response = await axios.get(
      "http://localhost:5000/api/getNote/deleted",
      {
        userid: auth.id,
      }
    );
    setNotes(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="display_delete_in_grid">
      {notes &&
        notes.map((item) => {
          if (item.delFlag == true) {
            return (
              <div className="edited_card_contaner" id={item._id}>
                <div className="edited_title">Title : {item.oldTitle}</div>
                <div className="edited_description">
                  Description : {item.oldDescription}
                </div>
                <div className="delete_btn_and_date_container">
                  <div className="updated_date">
                    Deleted date : {item.delDate}
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Deleted;
