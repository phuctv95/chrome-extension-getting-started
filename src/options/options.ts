const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
const selectedClassName = "current";
const containerDiv = document.querySelector("#containerDiv");

function handleButtonClick(event: any) {
    const current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }

    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ color });
}

function constructOptions(buttonColors: string[]) {
    chrome.storage.sync.get("color", (data) => {
        const currentColor = data.color;
        for (let buttonColor of buttonColors) {
            const button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor;

            if (buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }

            button.addEventListener("click", handleButtonClick);
            containerDiv!.appendChild(button);
        }
    });
}

constructOptions(presetButtonColors);
