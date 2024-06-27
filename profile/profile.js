/* Posts Page JavaScript */

"use strict";

// Initialize the page
window.onload = () => {
  if (!isLoggedIn()) {
    window.location.href = "index.html";
    return;
  }

  const loginData = getLoginData();

  document.querySelector(
    "#greeting"
  ).textContent = `Hello, ${loginData.username}! Welcome Back to TWIXTER`;

  // Get elements
  const logoutButton = document.querySelector("#logoutButton");
  const createACourseForm = document.querySelector("#createAPostForm");

  // Set up event listeners
  logoutButton.addEventListener("click", logout);
  createACourseForm.addEventListener("submit", createAPost);
};

const createAPost = async (event) => {
  //call preventDefault to keep the page from reloading
  event.preventDefault();

  //generate a new form data object
  let formData = new FormData(event.target);

  //generate a JavaScript Object from the formData object created above
  let formDataAsObject = Object.fromEntries(formData);

  //try catch for error handling
  try {
    //get the login data
    const loginData = getLoginData();
    //make a fetch (POST) request to create a post in the API
    let response = await fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${loginData.token}`,
        },
        //take the data from the form and build the body of the request
        body: JSON.stringify(formDataAsObject),
      }
    );
    //turn the response in to something we can work with
    let newPost = await response.json();

    //put the comments in the console

    let confirmationMessage = document.querySelector("#confirmationMessage");
    confirmationMessage.innerHTML = `You have sussuffuly created the post! click <a href=/posts/index.html>here</a> to read your post.`;

    //clear the text area
    let textArea = document.querySelector("#text");
    textArea.value = "";
  } catch (err) {
    //something is not right
    console.log("something went south");
  }
};
