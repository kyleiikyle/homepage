import React, { Component } from "react";

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

      // Do something with the response
    });
};

class BookmarkedRowCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bookmark: [],
    };
  }

  componentDidMount() {
    fetch(`${apiURL}users/${userID}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            bookmark: result.bookmark,
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
    const { bookmark } = this.state;
    update();

    return (
      <ul>
        {bookmark.map((row) => (
          <div>
            <br></br>
            {row}
          </div>
        ))}
      </ul>
    );
  }
}

export default BookmarkedRowCard;
