export const convertDate = (dateString) => {
  // Create a Date object from the ISO string
  const date = new Date(dateString);
  // Format the date as "Month Day, Year"
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
};

export const removeOldestItem = () => {
  let oldestKey = null;
  let oldestTimestamp = Infinity;

  // Iterate through all items in sessionStorage
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const item = JSON.parse(sessionStorage.getItem(key));

    // Find the item with the oldest timestamp
    if (item.timestamp < oldestTimestamp) {
      oldestKey = key;
      oldestTimestamp = item.timestamp;
    }
  }

  // Remove the oldest item
  if (oldestKey !== null) {
    sessionStorage.removeItem(oldestKey);
  }
};
