'use strict';

(function () {
    let linkBtn = document.getElementsByClassName('link-button choice')[0];
    let textBtn = document.getElementsByClassName('text-button choice')[0];
    let urlBar = document.getElementById('url');
    let titleBar = document.getElementsByName('title')[0];
    let textBody = document.getElementsByName('text')[0];
    let imgDrop = document.getElementById('image');

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

    function insertImage(image) {
        linkBtn.click();
        let dt = new DataTransfer();
        dt.items.add(new File([image], 'image.jpg'));
        imgDrop.files = dt.files;

        let event = new Event('change');
        imgDrop.dispatchEvent(event);
    }

    function handleMessage(request, sender, sendResponse) {
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
            case 'plowImage':
                insertImage(request.plowImage);
                break;
            default:
                throw new Error('Invalid event received from plow');
        }
    }

    browser.runtime.onMessage.addListener(handleMessage);
})();