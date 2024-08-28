const db = require("../db/queries.js");
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.resolve(__dirname, "../env.developement"),
});

const passwordChecker = (formData) =>
  formData.password === process.env.PASSWORD ? true : false;

async function getAllGames(req, res) {
  const games = await db.getAllGames();
  res.render("index", {
    games: games,
  });
}

async function searchGames(req, res) {
  const games = await db.searchGames(req.query.q);
  res.render("searchGames", {
    games: games
  });
}

async function getNewGame(req, res) {
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();
  res.render("createGame", {
    genres: genres,
    developers: developers,
  });
}

async function postNewGame(req, res) {
  const info = req.body;
  const id = await db.addToGamesTable(info);
  await db.addToGamesGenresTable(info.gameGenres, id[0].game_id);
  res.redirect("/");
}

async function getSelectedGameDetails(req, res) {
  const game = await db.getSelectedGameDetails(req.params.game_id);
  const genres = await db.getSelectedGameGenres(req.params.game_id);
  res.render("selectedGame.ejs", {
    game: game,
    genres: genres,
  });
}
async function getAllGenres(req, res) {
  const genres = await db.getAllGenres();
  res.render("genres", {
    genres: genres,
  });
}

async function getNewGenre(req, res) {
  res.render("createGenre");
}

async function postNewGenre(req, res) {
  await db.postNewGenre(req.body);
  res.redirect("/genres");
}

async function getGenreGames(req, res) {
  const genre_id = req.params.genre_id;
  const games = await db.getGenreGames(genre_id);
  const genre = await db.getGenre(genre_id);
  res.render("genreGames", {
    games: games,
    genre: genre[0],
  });
}

//update information
async function getUpdateGameDetails(req, res) {
  const game_id = req.params.game_id;
  const game = await db.getSelectedGameDetails(game_id);
  const results = await db.getSelectedGameGenres(game_id);
  const selectedGenres = results.map((result) => result.genre);
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();
  res.render("updateGames", {
    game: game,
    genres: genres,
    selectedGenres: selectedGenres,
    developers: developers,
  });
}

async function postUpdateGameDetails(req, res) {
  const game_id = req.params.game_id;
  if (passwordChecker(req.body)) {
    await db.updateGameDetails(
      game_id,
      req.body.gameName,
      req.body.gameDesc,
      req.body.gameDeveloper,
      req.body.gameImage,
      req.body.gameRating,
      req.body.gameYear,
      req.body.gameGenres
    );
    res.redirect("/");
  } else {
    res.redirect(`/games/${game_id}/edit`);
  }
}

async function deleteGame(req, res) {
  const game_id = req.params.game_id;
  if (passwordChecker(req.body)) {
    await db.deleteGame(game_id);
    res.redirect("/");
  } else {
    res.redirect(`/games/${game_id}`);
  }
}

async function getUpdateGenre(req, res) {
  const genre_id = req.params.genre_id;
  const genre = await db.getGenre(genre_id);
  res.render("updateGenre", {
    genre: genre[0],
  });
}

async function postUpdateGenre(req, res) {
  const genre_id = req.params.genre_id;
  const genreInfo = req.body;
  if (passwordChecker(req.body)) {
    await db.updateGenre(genreInfo, genre_id);
    res.redirect(`/genres/${genre_id}`);
  } else {
    res.redirect(`/genres/${genre_id}/edit`);
  }
}

async function deleteGenre(req, res) {
  const genre_id = req.params.genre_id;
  if (passwordChecker(req.body)) {
    await db.deleteGenre(genre_id);
    res.redirect("/genres");
  } else {
    res.redirect(`/genres/${genre_id}`);
  }
}

//developers
async function getAllDevelopers(req, res) {
  const developers = await db.getAllDevelopers();
  res.render("developers", {
    developers: developers,
  });
}

async function getDeveloperGames(req, res) {
  const developer_id = req.params.developer_id;
  const games = await db.getDeveloperGames(developer_id);
  res.render("developerGames", {
    games: games,
  });
}

async function getAddNewDeveloper(req, res) {
  res.render("createDeveloper");
}

async function postAddNewDeveloper(req, res) {
  const info = req.body;
  await db.createNewDeveloper(info);
  res.redirect("/developers");
}

module.exports = {
  getAllGames,
  searchGames,
  getAllGenres,
  getNewGame,
  postNewGame,
  getNewGenre,
  postNewGenre,
  getGenreGames,
  getSelectedGameDetails,

  getUpdateGameDetails,
  postUpdateGameDetails,
  deleteGame,

  getUpdateGenre,
  postUpdateGenre,
  deleteGenre,

  getAllDevelopers,
  getDeveloperGames,
  getAddNewDeveloper,
  postAddNewDeveloper,
};
