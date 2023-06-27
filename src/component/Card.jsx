import React, { useContext } from "react";
import "../css/card.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import copy from "copy-to-clipboard";
import axios from "axios";
import { UserContext } from "../context/Context";

const Card = ({
  title,
  description,
  cdate,
  id,
  change,
  changefun,
  handleEedit,
  handleDataAtCard,
  userid,
  checkEditing,
  EditingId,
}) => {
  const { auth, setAuth } = useContext(UserContext);
  const handledelete = async (nid) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    console.log(nid);
    const response = await axios.delete(
      `https://notesapp-ip0q.onrender.com/api/note/${nid}`
    );
    if (response.status === 204) {
      console.log(response);
      changefun(!change);
    } else {
      console.log(response);
    }
  };
  const handlEdit = async (eid) => {
    handleDataAtCard({
      title: title,
      description: description,
      userid: userid,
    });
    EditingId(eid);
    checkEditing(true);
    handleEedit(true);
    // const response = await axios.put(
    //   `https://notesapp-ip0q.onrender.com/api/note/${eid}`,
    //   data
    // );
  };
  const tocopy = () => {
    copy(description);
  };
  return (
    <div className="card_container">
      <div className="title">
        <span className="card_title"> Title </span>: {title}
      </div>
      <div className="description">
        <span className="card_title"> Description </span>: {description}
      </div>
      <div className="card_action_container">
        <div className="date_container">{cdate.substring(0, 10)}</div>
        <div className="card_action_options">
          <div className="icon_circle">
            <EditOutlinedIcon
              sx={{ height: "20px" }}
              onClick={() => handlEdit(id)}
            />
          </div>
          <div className="icon_circle">
            <DeleteOutlineOutlinedIcon
              sx={{ height: "20px" }}
              onClick={() => handledelete(id)}
            />
          </div>
          <div className="icon_circle">
            <ContentPasteIcon sx={{ height: "20px" }} onClick={tocopy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
