const pool = require("./pool.js");

async function getAllGames() {
  const query = `SELECT game_id, name, description, game_image, year FROM games;`;
  const { rows } = await pool.query(query);
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query(`SELECT * FROM genres`);
  return rows;
}

async function updateGamesTable(info) {
  const query = `INSERT INTO games (name, description, game_image, rating, year, developer_id) 
    VALUES
    ($1, $2, $3, $4, $5, $6) RETURNING game_id `;
  const { rows } = await pool.query(query, [
    info.gameName,
    info.gameDesc,
    info.gameImage,
    info.gameRating,
    info.gameYear,
    info.gameDeveloper,
  ]);
  return rows;
}

async function getSelectedGameDetails(id) {
  const query = `SELECT games.name, games.description,games.game_image,rating, games.year, developers.developer
    FROM games 
    INNER JOIN developers 
    ON games.developer_id=developers.developer_id
    WHERE games.game_id=$1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function getSelectedGameGenres(id) {
  const query = `SELECT genres.genre
        FROM games 
        LEFT JOIN games_genres ON games.game_id=games_genres.game_id
        LEFT JOIN genres ON games_genres.genre_id= genres.genre_id 
        WHERE games.game_id=$1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}

async function updateGamesGenresTable(genre_ids, game_id) {
  for (const genre_id of genre_ids) {
    await pool.query(
      `INSERT INTO games_genres (game_id, genre_id) 
      VALUES 
      ($1, $2)`,
      [game_id, genre_id]
    );
  }
  return;
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
  const { rows } = await pool.query(query, [id]);
  return rows;
}
async function getGenre(id) {
  const query = `SELECT genre FROM genres WHERE genre_id=$1`;
  const { rows } = await pool.query(query, [id]);
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

module.exports = {
  getAllGames,
  getAllGenres,
  getAllDevelopers,
  postNewGenre,
  getGenreGames,
  getGenre,
  updateGamesTable,
  updateGamesGenresTable,
  getSelectedGameDetails,
  getSelectedGameGenres,
};
