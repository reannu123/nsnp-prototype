import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import icons from mui
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";

function Header(props) {
  function handleClick() {
    console.log("Clicked");
  }
  return (
    <div className="d-flex col justify-content-between align-items-center text-center p-4 mb-2 text-bg-dark">
      <div className="d-flex align-items-center button" onClick={handleClick}>
        <SettingsIcon fontSize="large" />
        <div className="mx-2 d-none d-lg-flex align-items-center">
          <h4>Settings</h4>
        </div>
      </div>
      <h1>NSNP Simulation Prototype</h1>
      <div className="d-flex align-items-center button" onClick={handleClick}>
        <HistoryIcon fontSize="large" />
        <h4 className="mx-2 d-none d-lg-flex">History</h4>
      </div>
    </div>
  );
}

export default Header;
