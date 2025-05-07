// Function to check the background work status and update the UI accordingly
function backgroundcheck() {
    let backgroundwork = localStorage.getItem("backgroundwork");

    // If background work is enabled, disable inputs and set their values
    if (backgroundwork === "yes") {
        document.querySelector(".linkinput").disabled = true;
        document.querySelector(".timeinput").disabled = true;
        document.querySelector(".tickbtn").disabled = true;
        document.querySelector(".linkinput").value = localStorage.getItem("link");
        document.querySelector(".timeinput").value = localStorage.getItem("time");
    } 
    // If background work is disabled, enable inputs and clear their values
    else if (backgroundwork === "no") {
        document.querySelector(".linkinput").value = "";
        document.querySelector(".timeinput").value = "";
        document.querySelector(".linkinput").disabled = false;
        document.querySelector(".timeinput").disabled = false;
    }
}

// Initialize the tick button and add click event listener
const tickbtn = document.querySelector(".tickbtn");
tickbtn.addEventListener('click', () => {
    // Create an object to hold the time and link values
    let obj = {
        "time": document.getElementById("timeinput").value,
        "link": document.getElementById("linkinput").value,
    };

    // If the link is not empty, send a message to the active tab
    if (obj.link !== "") {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "message": "tickbtnclicked", "object": obj });
        });

        // Store the background work status and input values in local storage
        localStorage.setItem("backgroundwork", "yes");
        localStorage.setItem("time", obj.time);
        localStorage.setItem("link", obj.link);
    } 
    // If the link is empty, highlight the input fields in red
    else {
        document.querySelector(".linkinput").style.border = "2px solid red";
        document.querySelector(".timeinput").style.border = "2px solid red";
        setTimeout(() => {
            document.querySelector(".linkinput").style.border = "2px solid black";
            document.querySelector(".timeinput").style.border = "2px solid black";
        }, 2000);
    }
    backgroundcheck(); // Update the UI based on the new state
});

// Add click event listener for the stop button
document.querySelector(".stopbtn").addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "stopbtnclicked" });
    });

    // Clear local storage and update the background work status
    localStorage.clear();
    localStorage.setItem("backgroundwork", "no");
    backgroundcheck(); // Update the UI after stopping
});
