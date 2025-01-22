export const searchQuery = (query) => {
    try {
        if (query) {
            console.log(`Query Works: ${query}`);
        } else {
            console.log("No query entered.");
        }
    } catch (error) {
        console.log(error);
    }
};