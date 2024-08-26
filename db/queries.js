const pool = require("./pool.js");

async function getAllGames() {
  const query = `SELECT name, description, game_image, year FROM games;`;
  const { rows } = await pool.query(query);
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query(`SELECT * FROM genres`);
  return rows;
}

async function getGenreGames(id) {
  const query = `SELECT games.name, games.year, games.game_image, games.description, genres.genre
                    FROM games
                    LEFT OUTER JOIN games_genres
                    ON games.game_id = games_genres.game_id
                    LEFT OUTER JOIN genres
                    ON games_genres.genre_id=genres.genre_id
                    WHERE genres.genre_id=$1;
`;
  const {rows}= await pool.query(query,[id]);
  return rows;
}

async function getAllDevelopers() {
  const { rows } = await pool.query(`SELECT * FROM developers`);
  return rows;
}

async function postNewGenre(info) {
  const query = `INSERT INTO genres (genre, genre_image) VALUES ($1, $2)`;
  return await pool.query(query, [info.genre, info.genre_image]);
}

// async function postNewGame(gameInfo) {
//     const query=`INSERT INTO games `
// }
module.exports = {
  getAllGames,
  getAllGenres,
  getAllDevelopers,
  postNewGenre,
  getGenreGames,
};
