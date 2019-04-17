'use strict';

(function () {
    let linkBtn = document.getElementsByClassName('link-button choice')[0];
    let textBtn = document.getElementsByClassName('text-button choice')[0];
    let urlBar = document.getElementById('url');
    let titleBar = document.getElementsByName('title')[0];
    let textBody = document.getElementsByName('text')[0];
    let imgDrop = document.getElementById('image-field');

    function insertUrl(url) {
        linkBtn.click();
        urlBar.value = url;
    }

    function insertTextTitle(text) {
        textBtn.click();
        titleBar.value = text;
    }

    function insertTextBody(text) {
        textBtn.click();
        textBody.value = text;
    }

    function handleMessage(request, sender, sendResponse) {
        console.log(request);
        console.log(sender);
        console.log(sendResponse);

        switch (request.plowEvent) {
            case 'plowLink':
                insertUrl(request.plowUrl);
                break;
            case 'plowTitle':
                insertTextTitle(request.plowText);
                break;
            case 'plowBody':
                insertTextBody(request.plowText);
                break;
            default:
                throw new Error('Invalid event received from plow');
        }
    }

    browser.runtime.onMessage.addListener(handleMessage);

    console.log('Reddit handler is loaded');
})();