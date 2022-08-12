import React, { Component } from "react";
import "./findCard.css";
import bookmark from "../../Media/star.png";
import { joinActivity } from "../../js/main";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const masterKey = process.env.REACT_APP_MASTER_KEY;
const apiURL = process.env.REACT_APP_API_URL;
const userToken = localStorage.getItem("token");
const userID = localStorage.getItem("id");

let nodeItems = [...document.querySelectorAll(".activity-card-Details")];

for (var g of nodeItems) {
  // if (g.innerText == 'Mine' || innerText == 'test') {
  //   div.style.display = 'none';

  console.log(g.innerText);
}

//d

class FindCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rows: [],
    };
  }

  componentDidMount() {
    fetch(`${apiURL}activities`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            rows: result.rows,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { rows } = this.state;

    return (
      <ul>
        {rows.map((row) => (
          <div key={row.id}>
            <div className="activity-body">
              <div className="activity-card">
                <div className="activity-card-Details">
                  <div className="activityTitle" style={{ fontSize: "18px" }}>
                    {row.name}
                    <FontAwesomeIcon
                      icon={faBookmark}
                      style={{
                        float: "right",
                        fontSize: "x-large",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        Swal.fire({
                          title: "Would you like to bookmark this activity?",
                          showDenyButton: true,
                          confirmButtonText: "Bookmark",
                          denyButtonText: `Cancel`,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            Swal.fire("Event Bookmarked!", "", "success");
                            fetch(`${apiURL}users/bookmark/${userID}`, {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                access_token: userToken,
                                bookmark: row.name + " " + row.date,
                              }),
                            });
                          } else if (result.isDenied) {
                            Swal.fire(
                              "You have not bookmarked this event!",
                              "",
                              "error"
                            );
                          }
                        });
                      }}
                    />
                  </div>
                  <label
                    className="activityDateTime"
                    style={{ display: "grid" }}
                  >
                    Time - {row.date}
                  </label>
                  <div className="activity-card-Desc">
                    <label className="activityDesc">
                      Description - {row.desc}
                    </label>
                  </div>
                  <div className="activityPrice-Spaces-Join">
                    <label className="activityPrice">
                      Price Per Person - £{row.price}
                    </label>
                    <div>
                      <label className="activityPrice">
                        Activity Max Size - {row.size}
                      </label>
                      <div className="join-buttons">
                        <button
                          className="btnJoinActivity"
                          onClick={() => {
                            Swal.fire({
                              title: "Would you like to join this activity?",
                              showDenyButton: true,
                              confirmButtonText: "Join",
                              denyButtonText: `Cancel`,
                            }).then((result) => {
                              /* Read more about isConfirmed, isDenied below */
                              if (result.isConfirmed) {
                                Swal.fire(
                                  "You have joined this event!",
                                  "",
                                  "success"
                                );
                                fetch(`${apiURL}users/event/${userID}`, {
                                  method: "PUT",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    access_token: userToken,
                                    events: row.name + " " + row.date,
                                  }),
                                });
                              } else if (result.isDenied) {
                                Swal.fire(
                                  "You have not been added to this activity!",
                                  "",
                                  "error"
                                );
                              }
                            });
                          }}
                          type="button"
                          name="btnJoinActivity"
                        >
                          Join Activity
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ul>
    );
  }
}

export default FindCard;
