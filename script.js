console.log("Always Meet On Time content script loaded");

// Check if the current URL includes "meet.google.com"
if (location.href.includes("meet.google.com")) {
    console.log("On Google Meet page");
}

/**
 * Function to join the meeting by clicking the microphone and camera buttons
 */
function joinMeeting() {
    console.log("Attempting to join meeting");
    if (document.readyState === "complete") {
        try {
            // Click to turn off the microphone
            const micButton = window.document.querySelector('div[role="button"][aria-label="Turn off microphone"]');
            if (micButton) {
                micButton.click();
                console.log("Turned off microphone");
            }
            
            // Click to turn off the camera
            const cameraButton = window.document.querySelector('div[role="button"][aria-label="Turn off camera"]');
            if (cameraButton) {
                cameraButton.click();
                console.log("Turned off camera");
            }
        } catch (err) {
            console.error("Error while joining meeting:", err);
        }
        
        // Retry clicking the join button after a delay
        setTimeout(clickJoinButton, 2000);
    }
}

/**
 * Function to click the "Join now" button
 */
function clickJoinButton() {
    try {
        const joinButton = Array.from(window.document.querySelectorAll("button"))
            .find(button => button.textContent.includes("Join now"));
        if (joinButton) {
            joinButton.click();
            console.log("Clicked 'Join now' button");
        } else {
            console.log("Join button not found, will retry");
            setTimeout(clickJoinButton, 2000);
        }
    } catch (error) {
        console.error("Error while clicking join button:", error);
    }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "joinMeeting") {
        console.log("Received joinMeeting message");
        joinMeeting();
    }
});