import React, { useEffect, useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "../css/navbarandsidebar.css";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import Addnotes from "./Addnotes";
import Edited from "./Edited";
import Deleted from "./Deleted";
import axios from "axios";
import { UserContext } from "../context/Context";
const NavbarAndSidebar = () => {
  const { auth, setAuth } = useContext(UserContext);
  const [width, setWidth] = useState(true);
  const [action, setaction] = useState(1);
  const [search, setSearch] = useState("");
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
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
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
            style={
              action == 1
                ? {
                    width: !width ? "50px" : "100%",
                    height: "50px",
                    backgroundColor: "#feefc3",
                    marginInline: !width ? "auto" : "",
                    borderRadius: !width ? "50%" : "",
                    display: !width ? "grid" : "flex",
                    placeContent: "center",
                    paddingInline: "12.5px",
                    overflow: "hidden",
                  }
                : {}
            }
          >
            <DescriptionOutlinedIcon />
            {/* {width ? "Notes" : ""} */}
            <p style={{ display: width ? "" : "none" }}> Notes</p>
          </div>
          <div
            className={` sidebar_btn ${width ? "same" : "changewidth"}`}
            onClick={() => setaction(2)}
            style={
              action == 2
                ? {
                    width: !width ? "50px" : "100%",
                    height: "50px",
                    backgroundColor: "#feefc3",
                    marginInline: !width ? "auto" : "",
                    borderRadius: !width ? "50%" : "",
                    display: !width ? "grid" : "flex",
                    placeContent: "center",
                    paddingInline: "12.5px",
                    overflow: "hidden",
                  }
                : {}
            }
          >
            <HistoryToggleOffIcon />
            {/* {width ? "Edit" : ""} */}
            <p style={{ display: width ? "" : "none" }}>History</p>
          </div>
          <div
            className={` sidebar_btn ${width ? "same" : "changewidth"}`}
            onClick={() => setaction(3)}
            style={
              action == 3
                ? {
                    width: !width ? "50px" : "100%",
                    height: "50px",
                    backgroundColor: "#feefc3",
                    marginInline: !width ? "auto" : "",
                    borderRadius: !width ? "50%" : "",
                    display: !width ? "grid" : "flex",
                    placeContent: "center",
                    paddingInline: "12.5px",
                    overflow: "hidden",
                  }
                : {}
            }
          >
            <DeleteOutlineOutlinedIcon />
            {/* {width ? "Delete" : ""} */}
            <p style={{ display: width ? "" : "none" }}>Deleted</p>
          </div>
        </div>
        <div className="action_container_container">
          {action == 1 ? (
            <Addnotes search={search} />
          ) : action == 2 ? (
            <Edited search={search} />
          ) : (
            <Deleted search={search} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarAndSidebar;
