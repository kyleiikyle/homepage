import React, { Component } from "react";
import "./login.css";
import { loginUser, signUpUser } from "../../js/main";

class LiSu extends Component {
  //set the state default value
  constructor(props) {
    super(props);
    this.state = { login: "show col-lg-6 px-lg-4", register: "hide" };
  }
  showlogin = () => {
    //button click functionality

    this.setState({ login: "show col-lg-6 px-lg-4" });
    this.setState({ register: "hide" });
  };

  showregister = () => {
    //button click functionality

    this.setState({ login: "hide" });
    this.setState({ register: "show col-lg-6 px-lg-4" });
  };

  render() {
    return (
      <div className="Login">
        <div className="page-holder py-4 background-login">
          <div className="container">
            <div className="row align-items-center">
              <div className={this.state.login}>
                <div className="card-login">
                  <div className="loginBody">
                    <h3 className="logTitle">Welcome back to Group Up👋</h3>
                    <p className="subText">
                      Sign in to access your favourite activities, profile and
                      more!
                    </p>
                    <form id="loginForm" action="index.html">
                      <div className="login-email">
                        <label>Email Address</label>
                        <input
                          className="form-control"
                          id="loginEmailField"
                          type="email"
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                      <div className="login-password">
                        <label>Password</label>
                        <input
                          className="form-control"
                          id="loginPasswordField"
                          type="password"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <div className="remember-me">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          id="remember"
                        />
                        <label className="form-check-label">Remember me</label>
                      </div>
                      <div className="buttonLogin">
                        <button
                          className="button btnLogin"
                          type="button"
                          onClick={loginUser}
                          name="btnLogin"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <div className="text-footer">
                      Don't have an account?{" "}
                      <b onClick={this.showregister}>Register</b>
                    </div>
                  </div>
                </div>
              </div>
              {}
              <div className={this.state.register}>
                <div className="card-register">
                  <div className="registerBody">
                    <h3 className="regTitle">Get started with Group Up👊</h3>
                    <p className="subText">Activities are one step away!</p>

                    <form action="index.html">
                      <div className="reg-username">
                        <label>Username</label>
                        <input
                          className="form-control"
                          id="signupUNameField"
                          type="email"
                          placeholder="Joe_Bloggs123"
                          required
                        />
                      </div>
                      <div className="reg-email">
                        <label>Email Address</label>
                        <input
                          className="form-control"
                          id="signupEmailField"
                          type="email"
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                      <div className="reg-password">
                        <label>Password</label>
                        <input
                          className="form-control"
                          id="signupPasswordField"
                          type="password"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <div className="reg-terms">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="agree"
                          id="agree"
                        />
                        <label className="form-check-label">
                          I agree with the <a href="#">Terms & Conditions</a>{" "}
                        </label>
                      </div>
                      <div className="buttonRegister">
                        <button
                          className="button btnRegister"
                          onClick={signUpUser}
                          id="register"
                          type="button"
                          name="registerSubmit"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="card-footer">
                    <div className="text-footer">
                      Already have an account?{" "}
                      <b onClick={this.showlogin}>Login</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LiSu;
