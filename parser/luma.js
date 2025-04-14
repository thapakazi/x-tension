// Function to parse event details for Lu.ma
function parseLuma() {
  // Select the event title from the top-card-content (no reliance on event-page-desktop-only)
  const titleElement = document.querySelector('.top-card-content h1');
  const title = titleElement ? titleElement.innerText.trim() : null;

  // Extract the event description from content-card > content
  const descriptionElement = document.querySelector('.event-about-card');
  const description = descriptionElement ? descriptionElement.innerText.trim() : null;

  // Extract the event time from top-card-content > meta (first element with relevant info)
  const timeElement = document.querySelector('.top-card-content .meta .jsx-1546168629');
  const time = timeElement ? timeElement.innerText.trim() : null;

  // Extract the location from top-card-content > meta first element with location information
  const locationElement = document.querySelector('.top-card-content .meta .title');
  const location = locationElement ? locationElement.innerText.trim() : null;

  // Extract the event image
  const eventImageElement = document.querySelector('.cover-image img');
  const eventImage = eventImageElement ? eventImageElement.src : null;

  // Extract the host details from the hosts section (inside top-card-content)
  const hostNameElement = document.querySelector('.top-card-content .hosts .fw-medium');
  const hostName = hostNameElement ? hostNameElement.innerText.trim() : null;
  const hostLink = document.querySelector('.top-card-content .hosts a') ? document.querySelector('.top-card-content .hosts a').href : null;

  // Return parsed event details
  return {
    title: title || null,
    description: description || null,
    location: location || null,
    time: time || null,
    eventImage: eventImage || null,
    hostName: hostName || null,
    hostLink: hostLink || null,
    url: window.location.href
  };
}
