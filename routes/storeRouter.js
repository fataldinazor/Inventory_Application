const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeControllers");

storeRouter.get("/", storeController.getAllGames);
storeRouter.get("/games/:game_id", storeController.getSelectedGameDetails)
storeRouter.get("/create", storeController.getNewGame);
storeRouter.post("/create", storeController.postNewGame);

storeRouter.get("/genres", storeController.getAllGenres);
storeRouter.get("/genres/create", storeController.getNewGenre);
storeRouter.post("/genres/create", storeController.postNewGenre);
storeRouter.get("/genres/:id", storeController.getGenreGames);

module.exports = storeRouter;
