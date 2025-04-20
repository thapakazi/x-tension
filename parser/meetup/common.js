// Extract group name and event ID from the event URL
function getMeetupMeta(url){

  let groupName = null;
  let eventId = null;

  if (url) {
    // Match the event link pattern: https://www.meetupl.com/group/event_id/...
    let regex = /https:\/\/www\.meetup\.com\/([^\/]+)\/events\/([^\/?]+)/;
    let matches = url.match(regex);

    if (matches) {
      groupName = matches[1];  // Group name from URL
      eventId = matches[2];     // Event ID from URL
    }
  }
  return {groupName, eventId};
}

