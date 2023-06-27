import React from "react";
import "../css/navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
const Navbar = ({ SIDE, SIDEVALUE }) => {
  return (
    <div className="navbar_container">
      <div className="left_navbar_container">
        <div className="menu_icon_holder btn" onClick={() => SIDEVALUE(!SIDE)}>
          <MenuIcon onClick={() => SIDEVALUE(!SIDE)} />
        </div>
      </div>
      <div className="middle_navbar_container">
        <input type="text" name="" id="" placeholder="Search..." />
        <SearchIcon className="search_icon" />
      </div>
      <div className="right_navbar_container">
        <Brightness4Icon />
      </div>
    </div>
  );
};

export default Navbar;
