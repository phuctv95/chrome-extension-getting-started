document
    .querySelector('#changeColorBtn')
    .addEventListener('click', async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor,
        });
    });

function setPageBackgroundColor() {
    chrome.storage.sync.get('color', ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}
