const express= require('express');
const storeRouter= express.Router();
const storeController= require("../controllers/storeControllers");

storeRouter.get("/", storeController.getAllGames);
storeRouter.get("/genres", storeController.getAllGenres);
storeRouter.get("/create", storeController.getCreateForm);
storeRouter.post("/create", storeController.postCreateForm);

module.exports=storeRouter;
