// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SEND_DATA') {
    // The received payload now contains Markdown, title, and URL.
    const payload = message.payload;

    fetch('http://localhost:3000/events', {
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
