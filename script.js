const APIURL = "https://api.github.com/users/";


const form = document.getElementById("form");
const search = document.getElementById("search");
// function getUser(username) {
//     // return a promise, which is a placeholder for the data, which will be returned later, when the data is available, and the promise is resolved, or rejected, if the data is not available, or there is an error
//     axios.get(APIURL + username).then((response) => {
//         console.log(response.data); // response.data is the data returned from the API, which is the user object, which contains the user's information, such as name, bio, etc., which we can use to display on the page, or use to make other API calls, such as getting the user's repos, or followers, etc
//     }).catch((error) => {
//         console.log(error);
//     });

// }

const getUser = async (username) => {
    // {} is the object that we are destructuring from the response object, which is the data returned from the API, which is the user object
    try {
        const { data } = await axios.get(APIURL + username);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getUser("Dave-Guangyao-Li");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = search.value;

    // if the username is not empty, then call the getUser function, and pass in the username, and then clear the search input
    if (username) {
        getUser(username);
        search.value = "";
    }
});
