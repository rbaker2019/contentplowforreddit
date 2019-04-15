'use strict';

browser.contextMenus.create({
    id: "submit-url-reddit",
    title: "Submit this page on Reddit",
    contexts: ["page", "tab"]
});

browser.contextMenus.create({
    id: "submit-link-reddit",
    title: "Submit this link on Reddit",
    contexts: ["link"]
});

browser.contextMenus.create({
    id: "submit-image-reddit",
    title: "Submit this image on Reddit",
    contexts: ["image"]
});

browser.contextMenus.create({
    id: "submit-video-reddit",
    title: "Submit this video on Reddit",
    contexts: ["video"]
});

browser.contextMenus.create({
    id: "submit-text-title-reddit",
    title: "Submit this text as title on Reddit",
    contexts: ["selection"]
});

browser.contextMenus.create({
    id: "submit-text-body-reddit",
    title: "Submit this text as self post on Reddit",
    contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    console.dir(info);
    console.dir(tab);
});