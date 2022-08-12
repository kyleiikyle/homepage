import React, { Component } from "react";
import "./ContactCard.css";
import { contactUsSubmit } from "../../js/main";

class ContactCard extends Component {
  render() {
    return (
      <div className="page-holder py-4 background-contactUs">
        <div className="container">
          <div className="row align-items-center">
            <div className="card-contactUs">
              <div className="con-Body">
                <h3 className="con-Title">Get in touch with Group Up📝</h3>
                <p className="subText">
                  Email us any queries, problems and suggestions!
                </p>

                <form action="index.html">
                  <div className="con-fullName">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      className="form-control"
                      id="contactUsFullName"
                      type="fullName"
                      placeholder="Joe Bloggs"
                      required
                    />
                  </div>
                  <div className="con-email">
                    <label htmlFor="floatingInput">Email Address</label>
                    <input
                      className="form-control"
                      id="contactUsemail"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div className="con-message">
                    <label htmlFor="floatingPassword">Message</label>
                    <textarea
                      className="form-control"
                      id="contactUsmessage"
                      type="message"
                      placeholder="Message"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="buttonSubmit">
                    <button
                      className="button btnSubmit"
                      onClick={contactUsSubmit}
                      id="contactUsSubmit"
                      type="button"
                      name="registerSubmit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactCard;
