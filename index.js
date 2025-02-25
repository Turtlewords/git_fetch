const input = document.getElementById("input");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");

submitBtn.addEventListener('click', fetchInfo);

function fetchInfo() {
    let username = input.value;
    fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Username not found")
    })
    .then(data => {
        for (let prop in data) {
            console.log(prop + ": " +  data[prop]);
        }
        
        displayInfo(data);
        
    })
    .catch((error) => {
        output.innerHTML = error.message;
    })
    
}

function displayInfo(data) {
    output.innerHTML = `
    <div class="card">
        <div class="card-left">
            <h2>${data.login}</h2>
            <img src="${data.avatar_url}" alt="profile picture">
        </div>
        <div class="card-right">
            <p><span class="category">URL: </span><a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
            <p><span class="category">Bio: </span>${data.bio}</p>
            <p><span class="category"># of Repos: </span>${data.public_repos}</p>
            <p><span class="category">Company: </span>${data.company ? data.company : "Unknown"}</p>
        </div>
    </div>
    `
}
