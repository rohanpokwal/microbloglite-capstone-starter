/* Posts Page JavaScript */

"use strict";

// Initialize the page
window.onload = () => {
  if (!isLoggedIn()) {
    window.location.href = "index.html";
    return;
  }
  document.querySelector("#logoutButton").addEventListener("click", logout);
  getAllPosts();
};

// Function to fetch and display posts
const getAllPosts = async () => {
  try {
    const loginData = getLoginData();
    const response = await fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
      {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await response.json();
    console.log(posts);

    //Call this function to display the posts in the card
    displayPosts(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    alert("Something Went Wrong. Please try again.");
  }
};

// Function to display posts
const displayPosts = (posts) => {
  const postsContainer = document.querySelector("#postsContainer");
  postsContainer.innerHTML = "";
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "card mb-3";
    postElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${post.username}</h5>
                <p class="card-text">${post.text}</p>
                <p class="card-text"><small class="text-muted">${new Date(
                  post.createdAt
                ).toLocaleString()}</small></p>
                
               
            </div>
        `;
    postsContainer.appendChild(postElement);
  });
};
