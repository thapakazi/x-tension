// Map of sources to endpoints
const sourceToEndpointMap = {
  '/meetups': '/meetups',  // Meetup list page
  '/meetup': '/meetup',    // Single Meetup event
  '/luma': '/luma',        // Luma events
  // Add new sources and their endpoints here as needed
};

// Function to get endpoint based on source
export function getEndpoint(source) {
  return sourceToEndpointMap[source] || '/meetups';  // Default endpoint if not found
}
