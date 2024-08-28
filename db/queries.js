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

async function searchGames(search){
  const query=`
  SELECT * FROM games WHERE name ILIKE $1;`
  const searchPattern = `%${search}%`;
  const {rows}= await pool.query(query, [searchPattern]);
  return rows;
}

async function addToGamesTable(info) {
  const query = `
    INSERT INTO games (name, description, game_image, rating, year, developer_id) 
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
  const query = `
    SELECT games.game_id, games.name, games.description,games.game_image,rating, games.year, developers.developer
    FROM games 
    INNER JOIN developers 
    ON games.developer_id=developers.developer_id
    WHERE games.game_id=$1;`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function getSelectedGameGenres(id) {
  const query = `
  SELECT genres.genre
  FROM games 
  LEFT JOIN games_genres ON games.game_id=games_genres.game_id
  LEFT JOIN genres ON games_genres.genre_id= genres.genre_id 
  WHERE games.game_id=$1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}

async function addToGamesGenresTable(genre_ids, game_id) {
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
  const query = `
  SELECT games.game_id, games.name, games.year, games.game_image, games.description, genres.genre
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
  const query = `SELECT * FROM genres WHERE genre_id=$1`;
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

async function updateGameDetails(
  game_id,
  name,
  description,
  developer,
  image,
  rating,
  year,
  genre_ids
) {
  let query = `
  UPDATE games 
  SET name=$1, description=$2, game_image=$3, rating= $4, year= $5, developer_id=$6
  WHERE game_id=$7;
  `;
  await pool.query(query, [
    name,
    description,
    image,
    rating,
    year,
    developer,
    game_id,
  ]);

  //updating the games_genres Table
  query = `
  DELETE FROM games_genres WHERE game_id=$1;`;
  await pool.query(query, [game_id]);

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

async function deleteGame(game_id) {
  let query = `
  DELETE FROM games WHERE game_id=$1;`;
  await pool.query(query, [game_id]);

  //deleting from games_genres
  query = "DELETE FROM games_genres WHERE game_id=$1;";
  await pool.query(query, [game_id]);

  return;
}

async function updateGenre(genreInfo, genre_id) {
  const query = `
  UPDATE genres 
  SET genre=$1, genre_image=$2
  WHERE genre_id=$3;
  `;
  await pool.query(query, [genreInfo.genre, genreInfo.genre_image, genre_id]);
}

async function deleteGenre(genre_id) {
  //deleting from genres table
  let query = `DELETE FROM genres WHERE genre_id=$1;`;
  await pool.query(query, [genre_id]);

  //deleting from games_genres table
  query = `DELETE FROM games_genres WHERE genre_id=$1`;
  await pool.query(query, [genre_id]);

  return;
}

async function getAllDevelopers() {
  const { rows } = await pool.query(`SELECT * FROM developers`);
  return rows;
}

async function getDeveloperGames(developer_id) {
  const query = `
  SELECT developers.developer, games.game_id, games.name, games.description, games.game_image, games.rating, games.year
  FROM developers INNER JOIN 
  games ON developers.developer_id=games.developer_id WHERE developers.developer_id=$1;`;
  const { rows } = await pool.query(query,[developer_id]);
  return rows;
}

async function createNewDeveloper(info) {
  const query=`
  INSERT INTO developers (developer, developer_image) 
  VALUES
  ($1, $2);`

  return await pool.query(query,[info.developer, info.developer_image]);
}

module.exports = {
  getAllGames,
  getAllGenres,
  searchGames,
  getAllDevelopers,
  postNewGenre,
  getGenreGames,
  getGenre,
  addToGamesTable,
  addToGamesGenresTable,
  getSelectedGameDetails,
  getSelectedGameGenres,

  updateGameDetails,
  deleteGame,

  updateGenre,
  deleteGenre,

  getAllDevelopers,
  getDeveloperGames,
  createNewDeveloper
};
