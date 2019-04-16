function clickHandler(info, tab) {

    script = 'let linkBtn = document.getElementsByClassName("link-button choice")[0];\n';
    script += 'let textBtn = document.getElementsByClassName("text-button choice")[0];\n';
    script += 'let urlBar = document.getElementById("url");\n';
    script += 'let titleBar = document.getElementsByName("title")[0];\n';
    script += 'let textBody = document.getElementsByName("text")[0];\n';

    switch (info.menuItemId) {
        case "submit-url-reddit":
            script += 'linkBtn.click();\n';
            script += `urlBar.value = '${info.pageUrl}';\n`;
            break;

        case "submit-link-reddit":
            script += 'linkBtn.click();\n';
            script += `urlBar.value = '${info.linkUrl}';\n`
            break;

        case "submit-image-link-reddit":
            script += 'linkBtn.click();\n';
            script += `urlBar.value = '${info.srcUrl}';\n`
            break;

        case "submit-video-link-reddit":
            script += 'linkBtn.click();\n';
            script += `urlBar.value = '${info.srcUrl}';\n`
            break;

        case "submit-text-title-reddit":
            script += 'textBtn.click();\n';
            script += `titleBar.value = '${info.selectionText}'\n`;
            break;

        case "submit-text-body-reddit":
            script += 'textBtn.click();\n';
            script += `textBody.value = '${info.selectionText}'\n`;
            break;

        default:
            throw new Error('invalid menuItemId');
    }

    console.log(script);

    browser.storage.local.get("defaultSubreddit")
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
            browser.tabs.executeScript(newTab.id, { code: script });
        });
}

