// Function to check the background work status and update the UI accordingly
function checkTimerStatus() {
    // Get timer status from background script
    chrome.runtime.sendMessage({ message: "getTimerStatus" }, (response) => {
        if (response && response.backgroundwork === "yes") {
            // If timer is active, disable inputs and set their values
            document.querySelector(".linkinput").disabled = true;
            document.querySelector(".timeinput").disabled = true;
            document.querySelector(".tickbtn").disabled = true;
            document.querySelector(".linkinput").value = response.link;
            document.querySelector(".timeinput").value = response.time;
        } else {
            // If timer is not active, enable inputs and clear their values
            document.querySelector(".linkinput").value = "";
            document.querySelector(".timeinput").value = "";
            document.querySelector(".linkinput").disabled = false;
            document.querySelector(".timeinput").disabled = false;
            document.querySelector(".tickbtn").disabled = false;
        }
    });
}

// Call checkTimerStatus when popup is loaded
document.addEventListener('DOMContentLoaded', checkTimerStatus);

// Initialize the tick button and add click event listener
const tickbtn = document.querySelector(".tickbtn");
tickbtn.addEventListener('click', () => {
    // Create an object to hold the time and link values
    const details = {
        time: document.getElementById("timeinput").value,
        link: document.getElementById("linkinput").value,
    };

    // If the link is not empty, send a message to the background script
    if (details.link !== "") {
        chrome.runtime.sendMessage({ 
            message: "startTimer", 
            details: details 
        }, (response) => {
            if (response && response.success) {
                checkTimerStatus(); // Update UI after successful response
            }
        });
    } else {
        // If the link is empty, highlight the input fields in red
        document.querySelector(".linkinput").style.border = "2px solid red";
        document.querySelector(".timeinput").style.border = "2px solid red";
        setTimeout(() => {
            document.querySelector(".linkinput").style.border = "2px solid black";
            document.querySelector(".timeinput").style.border = "2px solid black";
        }, 2000);
    }
});

// Add click event listener for the stop button
document.querySelector(".stopbtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ message: "stopTimer" }, (response) => {
        if (response && response.success) {
            checkTimerStatus(); // Update UI after successful response
        }
    });
});
