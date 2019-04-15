function clickHandler(info, tab) {

    let script = '';

    switch (info.menuItemId) {
        case "submit-url-reddit":
            script += 'document.getElementsByClassName("link-button choice")[0].click();';
            break;

        case "submit-link-reddit":
            script += 'document.getElementsByClassName("link-button choice")[0].click();';
            break;

        case "submit-image-link-reddit":
            script += 'document.getElementsByClassName("link-button choice")[0].click();';
            break;

        case "submit-video-link-reddit":
            script += 'document.getElementsByClassName("link-button choice")[0].click();';
            break;

        case "submit-text-title-reddit":
            script += 'document.getElementsByClassName("text-button choice")[0].click();';
            break;

        case "submit-text-body-reddit":
            script += 'document.getElementsByClassName("text-button choice")[0].click();';
            break;

        default:
            throw new Error('invalid menuItemId');
    }

    let redditTab = browser.tabs.create({
        url: 'https://old.reddit.com/submit'
    })
        .then(newTab => {
            browser.tabs.executeScript(newTab.id, { code: script });
        });
}

