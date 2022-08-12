import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../Media/GroupUpLogo.png";
import { VscAccount } from "react-icons/vsc";

class NavBar extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="md"
        bg="navbar"
        variant="dark"
        className="py-0 "
      >
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="170"
            height="60"
            fill="#313E50"
            className="d-inline-block align-top"
          />
          <img className="align-bottom margin nav-brand-text medium-plus" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/find">Find</Nav.Link>
            <Nav.Link href="/organise">Organise</Nav.Link>
            <Nav.Link href="/help">Help</Nav.Link>
            <Nav.Link className="navAccount" href="/userProfile">
              <VscAccount />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
