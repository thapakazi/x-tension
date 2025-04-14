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

// Main function to scrape data based on domain
async function scrapeData() {
  const url = window.location.href;
  const domain = getDomain(url);

  // Check for known domains and apply specific parsers
  if (domain.includes('meetup.com')) {
    return parseMeetup();  // Call the Meetup parser function
  }
  if (domain.includes('lu.ma')) {
    return parseLuma();  // Call the Luma parser function
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
