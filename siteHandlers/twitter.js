'use strict';

document.addEventListener("mousedown", function (event) {
    //right click
    if (event.button == 2) {
        let target = event.target;
        let url = "https://twitter.com";
        try {
            url += target.offsetParent.attributes.getNamedItem("data-permalink-path").value;
        } catch (err) {
            try {
                url += target.attributes.getNamedItem("data-permalink-path").value;
            } catch (err) {
                url += target.offsetParent.offsetParent.attributes.getNamedItem("data-permalink-path").value;
            }
        }
        browser.runtime.sendMessage({ value: url });
    }
}, true);

console.log('twitter listener enabled');