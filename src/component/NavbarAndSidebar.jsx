import React, { useEffect, useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "../css/navbarandsidebar.css";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Addnotes from "./Addnotes";
import Edited from "./Edited";
import Deleted from "./Deleted";
import axios from "axios";
import { UserContext } from "../context/Context";
const NavbarAndSidebar = () => {
  const { auth, setAuth } = useContext(UserContext);
  const [width, setWidth] = useState(false);
  const [action, setaction] = useState(1);
  useEffect(() => {
    AutoDel();
  }, []);
  const AutoDel = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    const response = await axios.delete("http://localhost:5000/api/noteDel");
  };
  return (
    <div className="navbar_sidebar_container">
      <div className="navbar_container">
        <div className="menu_icon_container" onClick={() => setWidth(!width)}>
          <MenuIcon />
        </div>
        <div className="search_icon_container">
          <input type="text" name="" id="" placeholder="Search" />
          <SearchIcon />
        </div>
        <div></div>
      </div>
      <div className="sidebar_and_action_container">
        <div
          className="sidebar_containers"
          style={{ width: width ? "250px" : "75px" }}
        >
          <div
            className={` sidebar_btn ${width ? "same" : "changewidth"}`}
            onClick={() => setaction(1)}
          >
            <DescriptionOutlinedIcon />
            {/* {width ? "Notes" : ""} */} Notes
          </div>
          <div
            className={` sidebar_btn ${width ? "same" : "changewidth"}`}
            onClick={() => setaction(2)}
          >
            <ModeEditOutlineOutlinedIcon />
            {/* {width ? "Edit" : ""} */}
            Edited
          </div>
          <div
            className={` sidebar_btn ${width ? "same" : "changewidth"}`}
            onClick={() => setaction(3)}
          >
            <DeleteOutlineOutlinedIcon />
            {/* {width ? "Delete" : ""} */}
            Deleted
          </div>
        </div>
        <div className="action_container_container">
          {action == 1 ? <Addnotes /> : action == 2 ? <Edited /> : <Deleted />}
        </div>
      </div>
    </div>
  );
};

export default NavbarAndSidebar;
