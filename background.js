import { getEndpoint } from './parser/endpoints.js';  // Import the function

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SEND_DATA') {
    const payload = message.payload;

    // Get the endpoint based on the source
    const endpoint = getEndpoint(message.source);

    fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data successfully sent to JSON Server:', data);
        sendResponse({ success: true, serverResponse: data });
      })
      .catch(error => {
        console.error('Error sending data to JSON Server:', error);
        sendResponse({ success: false, error: error.message });
      });

    // Return true to keep the message channel open for asynchronous response.
    return true;
  }
});
