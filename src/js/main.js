import Swal from "sweetalert2";
import base64 from "base-64";

require("dotenv").config();

const masterKey = process.env.REACT_APP_MASTER_KEY;
const apiURL = process.env.REACT_APP_API_URL;
const userToken = localStorage.getItem("token");
const userID = localStorage.getItem("id");
const today = Date.now();
const time = new Intl.DateTimeFormat('en-US', {day: '2-digit', month: '2-digit',year: 'numeric'}).format(today);

// Function to check if user is logged in on page loads.
export function verCheck() {
  const LS = localStorage.getItem("token");
  if (LS === null) {
    window.location.replace("/login");
  }
}

export function contactUsSubmit() {
  const fullName = document.getElementById("contactUsFullName").value;

  Swal.fire({
    title: "Success!",
    text:
      "Thank you " +
      fullName +
      " for contacting us! We aim to respond within 24 - 48 hours",
    icon: "success",
    showCancelButton: false,
    showConfirmButton: false,
    timer: 4000,
  });
}

//Logout Function
export function logout() {
  localStorage.clear();
  window.location.replace("/login");
}

//Function to upload the users selected profile pic
export const proUpload = async () => {
  const { value: file } = await Swal.fire({
    title: "Select image",
    input: "file",
    inputAttributes: {
      accept: "image/*",
      "aria-label": "Upload your profile picture",
    },
  });

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      Swal.fire({
        title: "Your uploaded picture",
        imageUrl: e.target.result,
        imageAlt: "The uploaded picture",
      });
      console.log(e.target.result);
      fetch(`${apiURL}users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: userToken,
          picture: e.target.result,
        }),
      });
    };
    reader.readAsDataURL(file);
  }
};

export function joinActivity() {
  Swal.fire({
    title: "Would you like to join this activity?",
    showDenyButton: true,
    confirmButtonText: "Join",
    denyButtonText: `Cancel`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("You have joined this event!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("You have not been added to this activity!", "", "error");
    }
  });
}

export function loginUser() {
  const psw = document.getElementById("loginPasswordField").value;
  const email = document.getElementById("loginEmailField").value;

  fetch(`${apiURL}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${base64.encode(`${email}:${psw}`)}`,
    },
    body: JSON.stringify({ access_token: masterKey }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error("Incorrect Username Or Password");
    })
    .then((status) => {
      console.log(status);
      Swal.fire({
        title: "Success!",
        text: "Logging you in!",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
      });

      localStorage.setItem("token", status.token);
      localStorage.setItem("name", status.user.name);
      localStorage.setItem("email", status.user.email);
      localStorage.setItem("id", status.user.id);
      localStorage.setItem("picture", status.user.picture);

      // //Uncomment below before prod
      setTimeout(() => {
        window.location.href = "/home";
      }, 3000);

      // Do something with the response
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
      });
    });
}

export function signUpUser() {
  // Will retruve data from fields when js doc is imported.
  const psw = document.getElementById("signupPasswordField").value;
  const email = document.getElementById("signupEmailField").value;
  const name = document.getElementById("signupUNameField").value;

  signupUNameField;

  // Set const data from above vairables.
  const data = {
    access_token: masterKey,
    email: email,
    password: psw,
    name: name,
    role: "admin",
    member_since: time ,
  };

  // Sucess function if all conditions are met.
  {
    fetch(`${apiURL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // Then with the data from the response in JSON.
      .then((data) => {
        if (data.valid === false) {
          Swal.fire({
            title: "Error!",
            text: "An error occured please try again",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Account Created Successfully",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
          });

          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("id", data.user.id);
          localStorage.setItem("picture", data.user.picture);
          //Uncomment below before prod
          setTimeout(() => {
            window.location.href = "/home";
          }, 3000);
        }
      });
  }
}

export function chnagePassword() {
  const email = localStorage.getItem("email");

  Swal.fire({
    title: "Update Password",
    html: `<input type="password" id="currentPwd" class="swal2-input" placeholder="Current Password">
    <input type="password" id="newPwd" class="swal2-input" placeholder="New Password">`,
    confirmButtonText: "OK",
    focusConfirm: false,
    preConfirm: () => {
      const currentPwd = Swal.getPopup().querySelector("#currentPwd").value;
      const newPwd = Swal.getPopup().querySelector("#newPwd").value;
      if (!currentPwd || !newPwd) {
        Swal.showValidationMessage(`Change Password`);
      }
      return { currentPwd: currentPwd, newPwd: newPwd };
    },
  }).then((result) => {
    fetch(`${apiURL}users/${userID}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64.encode(
          `${email}:${result.value.currentPwd}`
        )}`,
      },

      body: JSON.stringify({ password: result.value.newPwd }),
    });
  });
}

export function chnageUsername() {
  Swal.fire({
    title: "Update Username",
    html: `<input type="text" id="newUsername" class="swal2-input" placeholder="New Username">
      `,
    confirmButtonText: "OK",
    focusConfirm: false,
    preConfirm: () => {
      const newUsername = Swal.getPopup().querySelector("#newUsername").value;

      if (!newUsername) {
        Swal.showValidationMessage(`Change Username`);
      }
      return { newUsername: newUsername };
    },
  })
    .then((result) => {
      fetch(`${apiURL}users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: result.value.newUsername,
          access_token: userToken,
        }),
      });
    })
    .then((result) => {
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
          localStorage.setItem("name", status.name);

          // Do something with the response
        });
    });
}
