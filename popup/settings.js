'use strict';

let button = document.getElementById("saveBtn");
let inputBox = document.getElementById("subreddit");

function saveSubreddit() {
    browser.storage.local.set({
        defaultSubreddit: inputBox.value
    })
        .then(() => { document.getElementById("banner").innerHTML = "Saved!"; });
}

button.addEventListener('click', saveSubreddit);
button.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBtn").click();
    }
});

browser.storage.local.get("defaultSubreddit")
    .then(stored => {
        inputBox.value = stored.defaultSubreddit || '';
    })
    .catch(err => {
        console.log(err);
        inputBox.value = '';
    });