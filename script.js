// let user_input = document.getElementById("user_input");

// let btn = document.getElementById("btn");
// let user_name = document.getElementById("user_name");
// let user_img = document.getElementById("user_img");
// console.log(user_img.src);
// let user_id = document.getElementById("user_id");
// let user_place = document.getElementById("user_place");
// let user_join = document.getElementById("user_join");
// let user_repositories = document.getElementById("user_repositories");
// let user_followers = document.getElementById("user_followers");
// let user_following = document.getElementById("user_following");
// let not_found = document.getElementById("not_found");
// let user_info = document.getElementById("user-info");
// let user_not_found = document.getElementById("user-not-found");

// btn.addEventListener("click", function () {
//   console.log(user_input.value);
//   let user = user_input.value;
//   const url = ` https://api.github.com/users/${user} `; //using template literal
//   // const url="https://api.github.com/users/" + user;
//   console.log(url);

//   fetch(url)
//     .then((data) => data.json())
//     .then(function (data) {
//       if (data.name === undefined) {
//         not_found.textContent = `${data.message}`;
//         user_not_found.style.display = "block"
//       } else {
//         user_name.textContent = `${data.name}`;
//         user_img.src = data.avatar_url;
//         user_id.textContent = `${data.login}`;
//         user_place.textContent = `${data.location}`;
//         user_join.textContent = `${data.created_at}`;
//         user_repositories.textContent = `${data.public_repos}`;
//         user_followers.textContent = `${data.followers}`;
//         user_following.textContent = `${data.following}`;
//         user_info.style.display = "block"
//       }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
  let user_input = document.getElementById("user_input");
  let btn = document.getElementById("btn");
  let user_name = document.getElementById("user_name");
  let user_img = document.getElementById("user_img");
  let user_id = document.getElementById("user_id");
  let user_place = document.getElementById("user_place");
  let user_join = document.getElementById("user_join");
  let user_repositories = document.getElementById("user_repositories");
  let user_followers = document.getElementById("user_followers");
  let user_following = document.getElementById("user_following");
  let not_found = document.getElementById("not_found");
  let user_info = document.getElementById("user-info");
  let user_not_found = document.getElementById("user-not-found");
  let user_url = document.getElementById("user_url");



  function getUser() {
    console.log(user_input.value);
    let user = user_input.value.trim(); // Remove extra spaces

    if (user === "") {
      user_not_found.style.display = "block";
      console.error("No username entered!");
      not_found.textContent = "No username entered!";
      user_info.style.display="none";
      return;
    }

    const url = `https://api.github.com/users/${user}`;

    fetch(url)
      .then((response) => response.json())
      .then(function (data) {
        if (data.message === "Not Found") {
          if (not_found) not_found.textContent = "User not found!";
          if (user_not_found) user_not_found.style.display = "block";
          if (user_info) user_info.style.display = "none";
        } else {
          if (user_name)
            user_name.textContent = data.name || "No name available";
          if (user_img) user_img.src = data.avatar_url;
          if (user_id) user_id.textContent = data.login;
          // if (user_url) user_url.setAttribute("href",`${data.html_url}`) //using set attribute
          if (user_url) user_url.href = data.html_url;
          if (user_place)
            user_place.textContent = data.location || "No location provided";
          if (user_join) {
            let date = new Date(data.created_at);

            let formattedDate = date.toLocaleDateString("en-US", {
              // weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            user_join.textContent = formattedDate;
          }
          if (user_repositories)
            user_repositories.textContent = data.public_repos;
          if (user_followers) user_followers.textContent = data.followers;
          if (user_following) user_following.textContent = data.following;
          if (user_info) user_info.style.display = "block";
          if (user_not_found) user_not_found.style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (not_found) not_found.textContent = "Error fetching data!";
      });
  }

  getUser()
  btn.addEventListener("click", getUser);
  user_input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      getUser();
    }
  });
});
