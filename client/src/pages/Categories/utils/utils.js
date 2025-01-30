export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the fetched data
  } catch (err) {
    console.error("Error fetching data:", err);
    return null; // Return null if there was an error
  }
};

export const fetchData = async (category) => {
  try {
    let url = `http://localhost:3001/api/search/${category}`;
    console.log(url);
    const result = await getData(url);
    return result
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
