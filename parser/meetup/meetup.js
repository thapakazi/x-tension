// Function to check if the event is online or in-person
function getEventType() {
  const onlineButton = document.querySelector('[data-testid="attend-online-btn"]');
  if (onlineButton) {
    return  'online';
  }
  const inPersonButton = document.querySelector('[data-testid="attend-irl-btn"]');
  if (inPersonButton) {
    return 'in-person';
  }
  return null;
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
  const type = getEventType();

  let url = window.location.href;
  let { groupName, eventId } = getMeetupMeta(url);

  // Return parsed event details
  return {
    id: eventId,
    groupName: groupName,
    title: title || null,
    url: url,
    eventType: type,
    time: time || null,
    description: description || null,
    imageUrl: imageUrl || null,
    location: location || null,
    locationLink: locationLink || null,
  };
}
