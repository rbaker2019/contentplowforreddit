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

function clickHandler(info, tab) {

    let plowEvent;

    function getPlowLinkEvent(url) {
        return {
            plowEvent: 'plowLink',
            plowUrl: url
        };
    }

    function getPlowTitleEvent(text) {
        return {
            plowEvent: 'plowTitle',
            plowText: text
        };
    }

    function getPlowBodyEvent(text) {
        return {
            plowEvent: 'plowBody',
            plowText: text
        };
    }

    switch (info.menuItemId) {
        case 'submit-url-reddit':
            plowEvent = getPlowLinkEvent(info.pageUrl);
            break;

        case 'submit-link-reddit':
            plowEvent = getPlowLinkEvent(info.linkUrl);
            break;

        case 'submit-image-link-reddit':
            plowEvent = getPlowLinkEvent(info.srcUrl);
            break;

        case 'submit-video-link-reddit':
            plowEvent = getPlowLinkEvent(info.srcUrl);
            break;

        case 'submit-text-title-reddit':
            if (info.selectionText.length > 300) {
                alert('Titles cannot be more than 300 characters, try selecting less text');
                return;
            }
            plowEvent = getPlowTitleEvent(info.selectionText);
            break;

        case 'submit-text-body-reddit':
            if (info.selectionText.length > 40000) {
                alert('Self-posts cannot be more than 40,000 characters, try selecting less text');
                return;
            }
            plowEvent = getPlowBodyEvent(info.selectionText);
            break;

        default:
            throw new Error('invalid menuItemId');
    }

    let newTabId;

    browser.storage.local.get('defaultSubreddit')
        .then(stored => {
            return stored.defaultSubreddit ? `https://old.reddit.com/r/${stored.defaultSubreddit}/submit` :
                'https://old.reddit.com/submit';
        })
        .then(url => {
            return browser.tabs.create({
                url: url
            });
        })
        .then(newTab => {
            newTabId = newTab.id;
            console.log(`Executing redditHandler script on tab ${newTabId}`);
            return browser.tabs.executeScript(newTabId, { file: 'src/redditHandler.js' });
        })
        .then((result) => {
            console.dir(result);
            console.log(`Sending message to tab ${newTabId}`);
            console.dir(plowEvent);
            return browser.tabs.sendMessage(newTabId, plowEvent);
        });
}
