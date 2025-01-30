export const cardPrices = (prices) => {
    if(!prices) {
        return
    }
    const arr = [];
    const priceNames = [
      { name: "high", alt: "High", value: null },
      { name: "low", alt: "Low", value: null },
      { name: "market", alt: "Market", value: null },
      { name: "mid", alt: "Mid", value: null }
    ];
  
    // Loop through the priceNames array and assign the values from the prices object
    priceNames.forEach((priceName) => {
      if (prices[priceName.name] !== undefined) {
        priceName.value = prices[priceName.name]; // Populate the value based on price name
      }
    });
  
    // Create the HTML output
    priceNames.forEach((priceName) => {
      if (priceName.value !== null) {
        arr.push(`${priceName.alt}: $${priceName.value} `);
      }
    });
  
    return arr;
  };
  
  export const upperCase = (str) => {
    switch (str) {
        case "reverseHolofoil":
           return "Reverse"
        case "1stEditionHolofoil":
            return "1st Edition"
        case "unlimitedHolofoil":
           return "Unlimited"
        default:
            break;
    }
    return str.replace(/^[a-z]/, (match) => match.toUpperCase());
  };