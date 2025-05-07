// Background script for Always Meet On Time extension
console.log("Background script initialized");

// Object to hold meeting details
let meetingDetails = {};
// Flag to track if timer is active
let isTimerActive = false;

/**
 * Function to get the current time in HH:MM format
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

/**
 * Function to check if it's time to join the meeting
 */
function checkMeetingTime() {
    console.log("Checking meeting time:", meetingDetails.time, getCurrentTime());
    
    if (meetingDetails.time === getCurrentTime()) {
        // Time to join the meeting
        isTimerActive = false;
        
        chrome.tabs.create({ url: meetingDetails.link }, (tab) => {
            // After tab is created, we'll send a message to join
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
                if (tabId === tab.id && changeInfo.status === 'complete' && tab.url.includes("meet.google.com")) {
                    chrome.tabs.sendMessage(tabId, { message: "joinMeeting" });
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        });
        
        // Clear any storage about active timers
        chrome.storage.local.set({ "backgroundwork": "no" });
        // Clear the alarm
        chrome.alarms.clear("meetingCheck");
    }
}

// Set up alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "meetingCheck") {
        checkMeetingTime();
    }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "startTimer") {
        meetingDetails = request.details;
        console.log("Starting timer for:", meetingDetails);
        
        // Clear any existing alarm
        chrome.alarms.clear("meetingCheck");
        
        // Create a new alarm that fires every minute
        chrome.alarms.create("meetingCheck", {
            periodInMinutes: 1
        });
        
        // Also check immediately
        checkMeetingTime();
        isTimerActive = true;
        
        // Store the state
        chrome.storage.local.set({
            "backgroundwork": "yes",
            "time": meetingDetails.time,
            "link": meetingDetails.link
        });
        
        sendResponse({ success: true });
    }
    
    if (request.message === "stopTimer") {
        console.log("Stopping timer");
        
        // Clear alarm
        chrome.alarms.clear("meetingCheck");
        
        isTimerActive = false;
        chrome.storage.local.set({ "backgroundwork": "no" });
        sendResponse({ success: true });
    }
    
    if (request.message === "getTimerStatus") {
        chrome.storage.local.get(["backgroundwork", "time", "link"], (result) => {
            sendResponse({
                isActive: isTimerActive,
                backgroundwork: result.backgroundwork || "no",
                time: result.time || "",
                link: result.link || ""
            });
        });
        return true; // Required for async sendResponse
    }
});

// Initialize state from storage on startup
chrome.storage.local.get(["backgroundwork", "time", "link"], (result) => {
    if (result.backgroundwork === "yes" && result.time && result.link) {
        meetingDetails = {
            time: result.time,
            link: result.link
        };
        
        // Set up the alarm
        chrome.alarms.create("meetingCheck", {
            periodInMinutes: 1
        });
        
        isTimerActive = true;
    }
}); 