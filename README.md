# Always Meet On Time

## Overview

"Always Meet On Time" is a browser extension designed to help you never miss or be late for your Google Meet meetings. You can set a specific time and provide a meeting link, and the extension will automatically open the Google Meet session for you. It also attempts to mute your microphone and turn off your camera by default upon joining, ensuring a smoother entry into your meetings.

## Key Features

- **Automatic Meeting Join:** Schedules and automatically opens Google Meet links at the specified time.
- **Default Mute & Camera Off:** Attempts to mute the microphone and turn off the camera before joining the meeting.
- **Simple Interface:** A clean popup allows users to easily input the meeting time and link.
- **Active Timer Indication:** Input fields are disabled and details are saved when a timer is active, providing clear visual feedback.
- **Tab Closure Warning:** Alerts users with a confirmation dialog if they attempt to close a tab while a meeting timer is active.
- **Persistent Scheduling:** Meeting details are stored locally using `localStorage`, so the schedule persists even if the browser is closed and reopened (until manually stopped).
- **Manual Stop:** Users can cancel the scheduled meeting join at any time via the popup.

## Prerequisites

- A web browser that supports Chrome extensions (e.g., Google Chrome, Microsoft Edge, Brave, Opera).

## Installation

To install "Always Meet On Time":

1.  **Download or Clone:**
    *   If you have the project files as a `.zip`, extract them to a folder on your computer.
    *   Alternatively, clone the repository: `git clone https://github.com/your-username/always-meet-on-time.git` (Replace with the actual repository URL if available).
2.  **Open Browser Extensions Page:**
    *   For Google Chrome: Type `chrome://extensions` in the address bar and press Enter.
    *   For Microsoft Edge: Type `edge://extensions` in the address bar and press Enter.
    *   For other compatible browsers, find the equivalent "Manage Extensions" page.
3.  **Enable Developer Mode:**
    *   Look for a toggle switch or checkbox labeled "Developer mode" (usually in the top right corner) and enable it.
4.  **Load Unpacked Extension:**
    *   Click the "Load unpacked" button.
    *   Navigate to the directory where you extracted or cloned the extension files (the folder containing the [`manifest.json`](manifest.json:0) file).
    *   Select the folder.

The "Always Meet On Time" extension icon should now appear in your browser's toolbar.

## Usage

1.  **Open the Popup:** Click on the "Always Meet On Time" extension icon in your browser's toolbar.
2.  **Set Meeting Time:** In the popup, use the time input field to select the desired time (HH:MM format) for the meeting to start.
3.  **Enter Meeting Link:** Paste the full Google Meet link into the text input field.
4.  **Start Timer:** Click the checkmark (✓) button.
    *   The input fields will become disabled, indicating the timer is active.
    *   The meeting time and link are now saved.
5.  **Automatic Join:** At the scheduled time, the extension will automatically open the Google Meet link in your current tab. It will attempt to mute your microphone and turn off your camera.
6.  **Cancel Timer:** To cancel a scheduled meeting, open the popup and click the 'X' button.
    *   The timer will be stopped, and the input fields will be cleared and re-enabled.

## Configuration

This extension does not require any external configuration files. All settings (meeting time and link) are managed directly through the popup interface. The details are stored in your browser's `localStorage`.

## Contributing

Contributions are welcome! If you'd like to contribute to "Always Meet On Time", please follow these general guidelines:

1.  **Fork the Repository:** (If applicable, from its source code hosting platform).
2.  **Create a Feature Branch:** `git checkout -b feature/YourFeatureName`
3.  **Commit Your Changes:** `git commit -m 'Add some amazing feature'`
4.  **Push to the Branch:** `git push origin feature/YourFeatureName`
5.  **Open a Pull Request:** Provide a clear description of your changes.

Please ensure your code adheres to general JavaScript best practices and maintains the existing coding style.