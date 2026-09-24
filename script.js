const discordButton = document.getElementById("discordButton");
const copiedText = document.getElementById("copied");

discordButton.addEventListener("click", function () {
    navigator.clipboard.writeText("ryterzalt");

    copiedText.textContent = "copied :)";

    setTimeout(function () {
        copiedText.textContent = "";
    }, 2000);
});


document.getElementById("year").textContent = new Date().getFullYear();

// never trust john this shits so hard to do but it works so i guess thats good enough for now! <3