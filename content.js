// content.js

// Function to determine the domain from the URL
function getDomain(url) {
  const domainMatch = url.match(/^https?:\/\/([^/]+)/);
  return domainMatch ? domainMatch[1] : '';
}

// Fallback parser for other domains (generally retrieves entire HTML)
function fallbackParse() {
  return {
    html: document.documentElement.outerHTML,
    title: document.title,
    url: window.location.href
  };
}

// Function to check if the event is online or in-person
function getEventIdAndType() {
  const onlineButton = document.querySelector('[data-testid="attend-online-btn"]');
  const inPersonButton = document.querySelector('[data-testid="attend-irl-btn"]');

  if (onlineButton) {
    const eventId = onlineButton.getAttribute('eventid');
    return { eventId, type: 'online' };
  }
  if (inPersonButton) {
    const eventId = inPersonButton.getAttribute('eventid');
    return { eventId, type: 'in-person' };
  }

  return { eventId: null, type: null };
}

// Function to parse the event details for meetup.com
function parseMeetup() {
  const eventDetails = document.querySelector('#event-details');
  const eventInfo = document.querySelector('#event-info');
  const eventLabelTop = document.querySelector('[data-event-label="top"]')

  if (!eventDetails || !eventInfo) {
    return null;
  }

  // Extract the event title and description
  const title = eventLabelTop.querySelector('h1') ? eventLabelTop.querySelector('h1').innerText.trim() : null;
  const description = eventDetails.querySelector('.break-words') ? eventDetails.querySelector('.break-words').innerText.trim() : null;

  // Extract location and venue link from event-info
  const location = eventInfo.querySelector('[data-testid="location-info"]') ? eventInfo.querySelector('[data-testid="location-info"]').innerText.trim() : null;
  const locationLink = eventInfo.querySelector('[data-testid="venue-name-link"]') ? eventInfo.querySelector('[data-testid="venue-name-link"]').href : null;

  // Extract event time from the time element
  const time = eventInfo.querySelector('time') ? eventInfo.querySelector('time').innerText.trim() : null;

  // Extract the event description image (if available)
  const eventImage = document.querySelector('picture[data-testid="event-description-image"] img');
  const imageUrl = eventImage ? eventImage.getAttribute('src') : null;

  // Get the event type (online or in-person)
  const {eventId, type} = getEventIdAndType();

  // Return parsed event details
  return {
    id: eventId || null,
    title: title || null,
    url: window.location.href,
    eventType: type,
    time: time || null,
    description: description || null,
    imageUrl: imageUrl || null,
    location: location || null,
    locationLink: locationLink || null,
  };
}

// Main function to scrape data based on domain
async function scrapeData() {
  const url = window.location.href;
  const domain = getDomain(url);

  // Check for known domains and apply specific parsers
  if (domain.includes('meetup.com')) {
    return parseMeetup();  // Call the Meetup parser function
  }

  // If the domain is unknown, fallback to the generic parser
  return fallbackParse();
}

// Send scraped data back to the background script
function sendScrapedData() {
  scrapeData().then((data) => {
    chrome.runtime.sendMessage({ type: 'SEND_DATA', payload: data }, function(response) {
      if (response && response.success) {
        console.log("Data successfully sent to JSON Server:", response.serverResponse);
      } else {
        console.error("Error sending data:", response && response.error);
      }
    });
  });
}

// Function to create and insert a button into the page for manual scraping
function addScrapeButton() {
  const button = document.createElement('button');
  button.innerText = 'Scrape & Send Data';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.padding = '10px 20px';
  button.style.fontSize = '14px';
  button.style.zIndex = '1000';
  button.style.cursor = 'pointer';

  // When the button is clicked, scrape and send the data
  button.addEventListener('click', sendScrapedData);
  document.body.appendChild(button);
}

// Insert the button when the content script loads
addScrapeButton();
