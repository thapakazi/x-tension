function getMeetupList() {
    // Select all event elements (adjust this selector based on the exact structure)
    let events = document.querySelectorAll('div[data-event-id]'); // Adjust the selector if needed
    let eventDetails = [];

    events.forEach(event => {
        // Extract the event title
        let title = event.querySelector('h2') ? event.querySelector('h2').innerText.trim() : null;

        // Extract the event date and time
        let dateTime = event.querySelector('time') ? event.querySelector('time').innerText.trim() : null;

        // Extract the event link (anchor tag inside the event)
        let eventLink = event.querySelector('a') ? event.querySelector('a').href : null;

        // Extract group name and event ID from the event URL
        let {groupName,eventId} = getMeetupMeta(eventLink);

        // Create an object for the event details
        eventDetails.push({
            title: title || null,
            date: dateTime || null,
            link: eventLink || null,
            groupName: groupName || null,
            eventId: eventId || null,
            url: window.location.href  // Current page URL
        });
    });

    return eventDetails;
}
