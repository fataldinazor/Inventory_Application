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
  res.redirect("/");
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
  console.log(games);
  res.render("genreGames",{
    games:games
  })
  // res.redirect("/genres");
}

module.exports = {
  getAllGames,
  getAllGenres,
  getNewGame,
  postNewGame,
  getNewGenre,
  postNewGenre,
  getGenreGames,
};
