import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/Context";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import "../css/edited.css";
const Deleted = ({ search }) => {
  const { auth, setAuth } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    const response = await axios.get(
      "https://notesapp-ip0q.onrender.com/api/getNote/deleted",
      {
        userid: auth.id,
      }
    );
    setNotes(response.data);
  };
  const handleForceDelete = async (ide) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    const response = await axios.delete(
      `https://notesapp-ip0q.onrender.com/api/note/forceDelete/${ide}`
    );
    getData();
  };
  const handleRestore = async (ide) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    const response = await axios.get(
      `https://notesapp-ip0q.onrender.com/api/note/restore/${ide}`
    );
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {}, [search]);
  return (
    <div className="display_delete_in_grid">
      {notes &&
        notes.map((item) => {
          if (
            item.delFlag == true &&
            (item.oldTitle?.toLowerCase().includes(search.toLowerCase()) ||
              item.title?.toLowerCase().includes(search.toLowerCase()))
          ) {
            return (
              <div
                className="edited_card_contaner"
                id={item._id}
                style={{ backgroundColor: "#f2f2f2" }}
              >
                <div className="edited_title">Title : {item.title}</div>
                <div className="edited_description">
                  Description : {item.description}
                </div>
                <div className="delete_btn_and_date_container">
                  <div className="updated_date">
                    Deleted date : {item.delDate}
                  </div>
                  <div
                    className="force_delete"
                    onClick={() => handleForceDelete(item._id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </div>
                  <div
                    className="restore_container"
                    title="restore"
                    onClick={() => handleRestore(item._id)}
                  >
                    <RestoreIcon />
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
