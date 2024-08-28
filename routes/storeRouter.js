const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeControllers");

storeRouter.get("/", storeController.getAllGames);
storeRouter.get("/games/:game_id", storeController.getSelectedGameDetails);
storeRouter.get("/create", storeController.getNewGame);
storeRouter.post("/create", storeController.postNewGame);
storeRouter.get("/search", storeController.searchGames);

storeRouter.get("/genres", storeController.getAllGenres);
storeRouter.get("/genres/create", storeController.getNewGenre);
storeRouter.post("/genres/create", storeController.postNewGenre);
storeRouter.get("/genres/:genre_id", storeController.getGenreGames);

storeRouter.get("/developers", storeController.getAllDevelopers);
storeRouter.get("/developers/create", storeController.getAddNewDeveloper);
storeRouter.post("/developers/create", storeController.postAddNewDeveloper)
storeRouter.get("/developers/:developer_id", storeController.getDeveloperGames);

storeRouter.get("/games/:game_id/edit", storeController.getUpdateGameDetails);
storeRouter.post("/games/:game_id/edit", storeController.postUpdateGameDetails);
storeRouter.post("/games/:game_id/delete", storeController.deleteGame);

storeRouter.get("/genres/:genre_id/edit", storeController.getUpdateGenre);
storeRouter.post("/genres/:genre_id/edit", storeController.postUpdateGenre);
storeRouter.post("/genres/:genre_id/delete", storeController.deleteGenre);

module.exports = storeRouter;
