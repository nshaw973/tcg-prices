/* For API use /search/searchTCG/ */
const getCardByName = async (type, query) => {
  try {
    const response = await fetch(`/api/search/${type}/${query}`); // Corrected API endpoint
    if (!response.ok) {
      throw new Error('Card not found');
    }
    const data = await response.json();  // Log the fetched data
    return data;  // Return the card data
  } catch (err) {
    console.log(err);
    return null;  // Return null if there was an error
  }
};

export const searchQuery = async (type, query) => {
  try {
    let cardData;
    switch (type) {
      case "name":
        cardData = await getCardByName(type, query); // Await the result from getCardByName
        if (cardData) {
          return(cardData)
        }
        break;
        case "id":
        cardData = getCardByName(type, query)
        if (cardData) {
          return(cardData)
        }
        break;
      default:
        return null;  // Return null if no valid query
    }
  } catch (error) {
    console.log("error found: "+ error);
  }
};
