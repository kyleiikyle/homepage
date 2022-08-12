import React, { Component } from "react";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="landing-background">
        <div className="landing-hero">
          <h1>Find and Create Activities?</h1>
          <h2>That's what we do!</h2>
          <div className="landing-buttons">
            <a className="btn landing-cta-1" href="/login">
              Find
            </a>
            <a className="btn landing-cta-2" href="/organise">
              Organise
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
