console.log("Always Meet On Time script is working");

// Timer variable for checking meeting time
let timer = null;
// Object to hold meeting details
let meetingDetails = {};

/**
 * Function to join the meeting by clicking the microphone and camera buttons
 */
function joinMeeting() {
    if (document.readyState === "complete") {
        try {
            // Click to turn off the microphone
            window.document.querySelector('div[role="button"][aria-label="Turn off microphone"]').click();
            // Click to turn off the camera
            window.document.querySelector('div[role="button"][aria-label="Turn off camera"]').click();
        } catch (err) {
            console.error("Error while joining meeting:", err);
        }
        // Retry joining the meeting after a delay
        setTimeout(joinMeet, 5000);
    }
}

/**
 * Function to click the "Join now" button
 */
function joinMeet() {
    try {
        const joinButton = Array.from(window.document.querySelectorAll("button"))
            .find(button => button.textContent.includes("Join now"));
        if (joinButton) {
            joinButton.click();
        } else {
            throw new Error("Join button not found");
        }
    } catch (error) {
        console.error("Error while clicking join button:", error);
    }
}

/**
 * Function to get the current time in HH:MM format
 * @returns {string} Current time as a string
 */
function getCurrentTime() {
    const myDate = new Date();
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    // Format hours and minutes to ensure two digits
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
}

// Listener for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "tickbtnclicked") {
        meetingDetails = request.object;
        console.log(meetingDetails);

        // Clear any existing timer
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        // Start checking for the meeting time
        checkMeetingTime();
    }
    if (request.message === "stopbtnclicked") {
        console.log("Stop button clicked");
    }
});

/**
 * Function to check if it's time to join the meeting
 */
function checkMeetingTime() {
    console.log("Checking meeting time:", meetingDetails.time, getCurrentTime(), location, meetingDetails.link);
    if (meetingDetails.time === getCurrentTime()) {
        location.replace(meetingDetails.link);
    } else {
        // Check again after 10 seconds
        timer = setTimeout(checkMeetingTime, 10000);
    }
}