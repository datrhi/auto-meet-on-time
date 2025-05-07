console.log("Always Meet On Time script is working");

// Timer variable for checking meeting time
let timer = null;
// Object to hold meeting details
let meetingDetails = {};
// Flag to track if timer is active
let isTimerActive = false;

// Check if the current URL includes "meet.google.com"
xp = location.href;
if (xp.includes("meet.google.com")) {
    // If it does, wait for 2 seconds and then join the meeting
    setTimeout(joinMeeting, 2000);
}
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

// Function to handle beforeunload event
function handleBeforeUnload(event) {
    // Show confirmation dialog
    event.preventDefault();
    // Chrome requires returnValue to be set
    event.returnValue = "You have an active meeting timer running. Are you sure you want to leave this page?";
    return event.returnValue;
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
        
        // Set timer active flag and add beforeunload listener
        isTimerActive = true;
        window.addEventListener('beforeunload', handleBeforeUnload);
    }
    if (request.message === "stopbtnclicked") {
        console.log("Stop button clicked");
        
        // Clear timer if it exists
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        
        // Set timer inactive and remove beforeunload listener
        isTimerActive = false;
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
});

/**
 * Function to check if it's time to join the meeting
 */
function checkMeetingTime() {
    console.log("Checking meeting time:", meetingDetails.time, getCurrentTime(), location, meetingDetails.link);
    if (meetingDetails.time === getCurrentTime()) {
        // Remove beforeunload listener before navigating
        window.removeEventListener('beforeunload', handleBeforeUnload);
        isTimerActive = false;
        location.replace(meetingDetails.link);
    } else {
        // Check again after 10 seconds
        timer = setTimeout(checkMeetingTime, 10000);
    }
}