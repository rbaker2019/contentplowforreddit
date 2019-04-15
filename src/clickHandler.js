function clickHandler(info, tab) {

    script = 'let linkBtn = document.getElementsByClassName("link-button choice")[0];\n';
    script += 'let textBtn = document.getElementsByClassName("text-button choice")[0];\n';

    switch (info.menuItemId) {
        case "submit-url-reddit":
            script += 'linkBtn.click();\n';
            break;

        case "submit-link-reddit":
            script += 'linkBtn.click();\n';
            break;

        case "submit-image-link-reddit":
            script += 'linkBtn.click();\n';
            break;

        case "submit-video-link-reddit":
            script += 'linkBtn.click();\n';
            break;

        case "submit-text-title-reddit":
            script += 'textBtn.click();\n';
            break;

        case "submit-text-body-reddit":
            script += 'textBtn.click();\n';
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

