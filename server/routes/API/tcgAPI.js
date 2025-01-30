const pokemon = require("pokemontcgsdk");
const API_KEY = process.env.API_KEY;
pokemon.configure({ apiKey: API_KEY });

const router = require("express").Router();

// Fetch card by ID
router.get("/id/:id", async (req, res) => {
  try {
    const { id } = req.params; // Fetch card by ID
    const card = await pokemon.card.find(id);
    res.json(card); // Return card data as JSON
  } catch (error) {
    res.status(500).send("Error fetching card by ID");
  }
});

// Fetch cards by Name
router.get("/name/:name", async (req, res) => {
  try {
    const { name } = req.params; // Fetch cards by name
    const result = await pokemon.card.where({
      q: `name:${name}`,
      orderBy: `-set.releaseDate`,
    });
    if (result.data && result.data.length > 0) {
      res.json(result.data); // Send card data as JSON
    } else {
      res.status(404).send("Card not found");
    }
  } catch (error) {
    console.error("Error fetching card by name:", error);
    res.status(500).send("Error fetching card by name");
  }
});

// Fetch cards by Series
router.get("/series", async (req, res) => {
  try {
    const result = await pokemon.set.all({ orderBy: `-releaseDate` });
    res.json(result);
  } catch (error) {
    console.error("Error fetching card by name:", error);
    res.status(500).send("Error fetching card by name");
  }
});

router.get("/types", async (req, res) => {
  try {
    const result = await pokemon.type.all();
    res.json(result);
  } catch (error) {
    console.error("Error fetching card by name:", error);
    res.status(500).send("Error fetching card by name");
  }
});


router.get("/series/:series", async (req, res) => {
  try {
    const { series } = req.params; // Fetch cards by name
    const result = await pokemon.card.where({
      q: `set.id:${series}`,
      orderBy: `-number`,
    });
    if (result.data && result.data.length > 0) {
      res.json(result.data); // Send card data as JSON
    } else {
      res.status(404).send("Card not found");
    }
  } catch (error) {
    console.error("Error fetching card by name:", error);
    res.status(500).send("Error fetching card by name");
  }
});

// Fetch card by Type

module.exports = router;
