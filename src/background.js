'use strict';

browser.contextMenus.create({
    id: "submit-url-reddit",
    title: "Link to page on Reddit",
    contexts: ["page", "tab"]
});

browser.contextMenus.create({
    id: "submit-link-reddit",
    title: "Submit link on Reddit",
    contexts: ["link"]
});

browser.contextMenus.create({
    id: "submit-image-link-reddit",
    title: "Link to image on Reddit",
    contexts: ["image"]
});

browser.contextMenus.create({
    id: "submit-video-link-reddit",
    title: "Link to video on Reddit",
    contexts: ["video"]
});

browser.contextMenus.create({
    id: "submit-text-title-reddit",
    title: "Use selection as title on Reddit",
    contexts: ["selection"]
});

browser.contextMenus.create({
    id: "submit-text-body-reddit",
    title: "Use selection as self post on Reddit",
    contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(clickHandler);