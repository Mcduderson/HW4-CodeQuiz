//declaring global variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

//click event + function that clears local storage.
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//gets local stroage.
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

//event listener to move to index page.
goBack.addEventListener("click", function () {
    window.location.replace("../index.html");
});