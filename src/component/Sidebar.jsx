import React from "react";
import "../css/sidebar.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const Sidebar = ({ SIDE, ACTIONVALUE }) => {
  return (
    <div className="sidebar_container">
      <div
        className={`notes_icon_container btn ${
          SIDE ? "" : "additionalClass fiftypercent"
        }`}
        onClick={() => ACTIONVALUE(1)}
      >
        <DescriptionOutlinedIcon />
        {SIDE ? "Add Notes" : ""}
      </div>
      <div
        className={`edit_icon_container btn ${
          SIDE ? "" : "additionalClass fiftypercent"
        }`}
        onClick={() => ACTIONVALUE(2)}
      >
        <ModeEditOutlineOutlinedIcon />

        {SIDE ? "Edited" : ""}
      </div>
      <div
        className={`delete_icon_container btn ${
          SIDE ? "" : "additionalClass fiftypercent"
        }`}
        onClick={() => ACTIONVALUE(3)}
      >
        <DeleteOutlineOutlinedIcon />
        {SIDE ? "Deleted" : ""}
      </div>
    </div>
  );
};

export default Sidebar;
