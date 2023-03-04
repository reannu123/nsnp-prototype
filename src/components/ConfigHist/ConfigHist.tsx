import * as React from "react";
import { slide as BurgerMenu } from "react-burger-menu";
import "./ConfigHist.css";

export default function ConfigHist(props) {
  return (
    <BurgerMenu right onOpen={props.handleOpenedMenu}>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
      <a onClick={props.set} className="menu-item--small" href="">
        Settings
      </a>
    </BurgerMenu>
  );
}
