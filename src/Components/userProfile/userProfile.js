import React, { Component } from "react";
import "./userProfile.css";
import {
  proUpload,
  logout,
  chnagePassword,
  chnageUsername,
} from "../../js/main";
import BookmarkedRowCard from "./BookmarkedRowCard";
import MyActivitiesRowCard from "./MyActivitiesRowCard";
import UpcommingRowCard from "./UpcommingRowCard";

const userToken = localStorage.getItem("token");
const apiURL = process.env.REACT_APP_API_URL;
const userID = localStorage.getItem("id");

const update = () => {
  fetch(`${apiURL}users/${userID}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error("Incorrect Username Or Password");
    })
    .then((status) => {
      localStorage.setItem("events", status.events);
      localStorage.setItem('member_since', status.member_since)

      // Do something with the response
    });
};

class UserProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: [],
    };
  }

  render() {
    update();
    return (
      <div className="profile-background">
        <div className="profile-wrapper">
          <div className="profile-card">
            <img
              className="gavatar"
              src={localStorage.getItem("picture")}
              alt="Profile Picture"
            />{" "}
            <div className="editProfilePicture">
              <button
                className="button btneditProfilePicture"
                type="button"
                name="btneditProfilePicture"
                onClick={proUpload}
              >
                Upload Picture
              </button>
            </div>
            <div className="profile-information">
              <div className="user-startDate">Member Since - {localStorage.getItem('member_since')}</div>
              <div className="user-details" style={{ marginTop: "20px" }}>
                Username - {localStorage.getItem("name")}
                <br></br>
                <br></br>
                Email - {localStorage.getItem("email")}
              </div>
            </div>
            <div className="profile-edit">
              <button
                className="button btnProfileEdit"
                type="button"
                name="btnProfileEdit"
                onClick={chnageUsername}
              >
                Edit Profile
              </button>
            </div>
            <div className="profile-edit">
              <button
                className="button btnUpdatePassword"
                type="button"
                name="btnProfileEdit"
                onClick={chnagePassword}
              >
                Update Password
              </button>
            </div>
            <div className="logout">
              <button
                className="button btnLogout"
                type="button"
                name="btnLogout"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div className="activities-wrapper">
          <div className="upcoming-activities-card">
            <div className="upcoming-activities-title">Upcoming Activities</div>

            <UpcommingRowCard></UpcommingRowCard>

            <div className="upcoming-activities">
              <label className="upcoming-activity"></label>
            </div>
          </div>

          <div className="bookmarked-activities-card">
            <div className="bookmarked-activities-title">
              Bookmarked Activities
            </div>
            <div className="bookmarked-activities">
              <label className="bookmarked-activity">
                <BookmarkedRowCard></BookmarkedRowCard>
              </label>
            </div>
          </div>

          <div className="my-activities-card">
            <div className="my-activities-title">My Activities</div>
            <div className="my-activities">
              <label className="my-activity">
                <MyActivitiesRowCard></MyActivitiesRowCard>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfileCard;
