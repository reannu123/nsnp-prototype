import * as React from "react";
import StyledBurgerMenu from "../StyledBurgerMenu/StyledBurgerMenu";
import "./Settings.css";
import { slide as BurgerMenu } from "react-burger-menu";

export default function ConfigHist(props) {
  return (
    <BurgerMenu
      left
      isOpen={props.open}
      onClose={props.onClose}
      customBurgerIcon={false}
      customCrossIcon={false}
      width={"30vmax"}
      itemListElement="div"
    >
      <div className="ListPane">
        <h1>Settings</h1>
        <div className="ListItem Setting">
          <h4>About</h4>
        </div>
        <div className="ListItem Setting">
          <h4>Simulation Mode</h4>
        </div>
        <div className="ListItem Setting">
          <h4>Help</h4>
        </div>
      </div>
    </BurgerMenu>
  );
}
