const db = require("../db/queries.js");

async function getAllGames(req, res) {
  const games = await db.getAllGames();
  res.render("index", {
    games: games,
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
  const id = await db.updateGamesTable(info);
  console.log(id[0].game_id);
  await db.updateGamesGenresTable(info.gameGenres, id[0].game_id);
  console.log("done");
  res.redirect("/");
}

async function getSelectedGameDetails(req, res) {
  const game = await db.getSelectedGameDetails(req.params.game_id);
  const genres = await db.getSelectedGameGenres(req.params.game_id);
  console.log(game, genres);
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
  const params = req.params.id;
  const games = await db.getGenreGames(params);
  const genre = await db.getGenre(params);
  res.render("genreGames", {
    games: games,
    genre: genre[0].genre,
  });
}

module.exports = {
  getAllGames,
  getAllGenres,
  getNewGame,
  postNewGame,
  getNewGenre,
  postNewGenre,
  getGenreGames,
  getSelectedGameDetails,
};
