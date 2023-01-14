const APIURL = "https://api.github.com/users/";


const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
// function getUser(username) {
//     // return a promise, which is a placeholder for the data, which will be returned later, when the data is available, and the promise is resolved, or rejected, if the data is not available, or there is an error
//     axios.get(APIURL + username).then((response) => {
//         console.log(response.data); // response.data is the data returned from the API, which is the user object, which contains the user's information, such as name, bio, etc., which we can use to display on the page, or use to make other API calls, such as getting the user's repos, or followers, etc
//     }).catch((error) => {
//         console.log(error);
//     });

// }

const createUserCard = (user) => {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''

    const cardHTML = `
    <div class="card">
        <div>
            <img
            src="${user.avatar_url}"
            alt="${user.name}"
            class="avatar"
            />
        </div>
        <div class="user-info">
          <h2>${userID}</h2>
          <p>${userBio}</p>
          <ul>
            <li>${user.followers} <strong> Followers</strong></li>
            <li>${user.following}  <strong> Following</strong></li>
            <li>${user.public_repos} <strong> Repos</strong></li>
          </ul>

          <div id="repos">
          </div>
        </div>
      </div>
    `
    main.innerHTML = cardHTML;
}

const createErrorCard = (msg) => {
    const cardHTML = `
    <div class="card">
        <div class="user-info">
            <h1>${msg}</h1>
        </div>
    </div>
    `
    main.innerHTML = cardHTML;
}

const getRepos = async (username) => {
    try {
        const { data } = await axios.get(APIURL + username + "/repos?sort=created");

        addReposToCard(data);
    } catch (error) {
        createErrorCard("Problem fetching repos");
    }
}

const getUser = async (username) => {
    // {} is the object that we are destructuring from the response object, which is the data returned from the API, which is the user object
    try {
        const { data } = await axios.get(APIURL + username);
        createUserCard(data);
        // call the getRepos function, and pass in the username
        getRepos(username);
    } catch (error) {
        // check if the error is a 404 error, which means the user is not found
        if (error.response.status == 404) {
            createErrorCard("No profile with this username");
        }
    }
}

// add repos to user card
const addReposToCard = (repos) => {
    const reposEl = document.getElementById("repos");
    // repos is an array of objects, which contains the repo's information, such as name, url, etc
    repos.slice(0, 5).forEach((repo) => { // loop through the first 5 repos
        const repoEl = document.createElement("a"); // create an anchor tag
        repoEl.classList.add("repo"); // add a class to the anchor tag
        repoEl.href = repo.html_url // set the href attribute to the repo's url 
        repoEl.target = '_blank' // set the target attribute to _blank, so that the repo will open in a new tab
        repoEl.innerText = repo.name // set the text of the anchor tag to the repo's name

        reposEl.appendChild(repoEl)
    })
}

// add an event listener to the form, and listen for the submit event, and then call the getUser function, and pass in the username
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = search.value;

    // if the username is not empty, then call the getUser function, and pass in the username, and then clear the search input
    if (username) {
        getUser(username);
        search.value = "";
    }
});


getUser("Dave-Guangyao-Li");