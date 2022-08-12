import React, { Component } from "react";
import "./accountScreens.css";

class ErrorMessage extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Oops!</h1>
        <div className="fullscreen">
          <h2 className="subtitle">
            Something Broke! We&apos;ll try and get it working soon.
          </h2>
          <p>
            <a href="/login">Go Back</a>
          </p>
        </div>
      </div>
    );
  }
}

export default ErrorMessage;
