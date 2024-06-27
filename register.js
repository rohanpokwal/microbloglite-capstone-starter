"use strict";

window.onload = () => {
  // Get the registration form from the page
  const registrationForm = document.querySelector("#registrationForm");

  // Listen for the form submission and call createAUser
  registrationForm.addEventListener("submit", createAUser);
};

// Function to create a user
const createAUser = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Generate a new FormData object from the form
  let formData = new FormData(event.target);

  // Convert the FormData object to a JavaScript Object
  let formDataAsObject = Object.fromEntries(formData);

  try {
    // Make a fetch (POST) request to create a user in the API
    let response = await fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/users",
      {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(formDataAsObject),
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Registration failed");
    }

    // Show registration successful alert
    alert("Registration successful! Click OK to proceed to login.");

    // Redirect to the login page after successful registration
    window.location.href = "index.html";
  } catch (error) {
    // Handle errors
    console.error("Registration failed:", error.message);
    alert("Registration failed. Please try again.");
  }
};
