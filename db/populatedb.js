const { Client } = require("pg");
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "../.env.development"),
});

const SQL = `
CREATE TABLE IF NOT EXISTS developers(
developer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
developer VARCHAR(127),
developer_image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS games(
game_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(127) NOT NULL,
description VARCHAR(300),
game_image VARCHAR(255),
rating DECIMAL(2,1),
year INTEGER,
developer_id INTEGER,
FOREIGN KEY (developer_id) REFERENCES developers(developer_id)
);

CREATE TABLE IF NOT EXISTS genres(
genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
genre VARCHAR (127),
genre_image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS games_genres(
game_id INT,
genre_id INT,
PRIMARY KEY(game_id, genre_id),
FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

INSERT INTO genres (genre, genre_image) 
VALUES
('Action', 'https://m.media-amazon.com/images/M/MV5BODMzM2EyYmUtYzEyYS00NmVmLThlMGQtMDdlNzZiYTI4YmRjXkEyXkFqcGdeQXVyNjUxNDQwMzA@._V1_.jpg'),
('Horror', 'https://m.media-amazon.com/images/M/MV5BOTVlYWVmOTYtNGI3OS00YWUyLTlkZDItMDA4ZWZiNjVmZmZmXkEyXkFqcGdeQXVyMjM5NzU3OTM@._V1_.jpg'), 
('Open World','https://m.media-amazon.com/images/M/MV5BMzFjNzAzMDctNjVjNy00YTI3LWExMTctNjVmMDFlYTE1N2RlXkEyXkFqcGc@._V1_.jpg'), 
('Sports', 'https://m.media-amazon.com/images/M/MV5BZTZkZWZjMjgtMDBjZi00MDA3LTg3YjQtNjAyZjk1MzUyOWQ5XkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg'), 
('Shooting', 'https://m.media-amazon.com/images/M/MV5BNDNjMDQwMTItMWU4Yy00MGEwLWFhYTUtZWQ2ODkzMzM0YTJkXkEyXkFqcGdeQXVyNzczNzE5MTg@._V1_.jpg'), 
('Story', 'https://m.media-amazon.com/images/M/MV5BYzhkZTk1YmQtMWY1Yi00NTBlLWJkNTMtYjI2M2FmYzkzYzdlXkEyXkFqcGdeQXVyNjYwMTAzNDU@._V1_.jpg');

INSERT INTO developers (developer, developer_image)
VALUES 
('Activsion','https://www.svgrepo.com/show/305646/activision.svg'), 
('Capcom','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Capcom_logo_icon.svg/927px-Capcom_logo_icon.svg.png'), 
('Electronic Arts','https://cdn.worldvectorlogo.com/logos/ea-sports-3.svg'), 
('Epic Games','https://www.virlan.co/trends/wp-content/uploads/2021/08/epic-games-launcher.jpg'), 
('Rockstar Games','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSflGVhlidIfcgakpKTvLP2N_ndb6vl5v9Kog&s'), 
('Sony','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDafNoR8hlEbIY6G_GJv-zTXNYi14KfrYikA&s'), 
('Steam','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS02KltjpGtKpkohfuX59ULktaZcLO3qxHNsQ&s'), 
('Ubisoft','https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/7a1d8c04-ccbd-4820-ba29-480cddf0b445/d4ieb3e-893e7958-b82a-45d0-85e0-ac32eead859f.png');

INSERT INTO games (name, description, game_image, rating, year, developer_id ) 
VALUES
('Grand Theft Auto V', 'An open-world action-adventure game set in the fictional state of San Andreas.', 'https://m.media-amazon.com/images/M/MV5BYjEzMTM4ZmQtZTEzYS00ZGVmLTkwM2EtNWNmMDI4OWQ0MjBmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg', 9.5, 2013, 5),
('God of War', 'An action-adventure game following Kratos and his son on a quest in Norse mythology.', 'https://m.media-amazon.com/images/M/MV5BZjc2NmExYWEtMTllNi00NTc5LTliZDgtMWRmMjQzMjg1NDJmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg', 9.6, 2018, 6),
('Uncharted 4: A Thiefs End', 'An action-adventure game featuring treasure hunter Nathan Drake on his final adventure.','https://m.media-amazon.com/images/M/MV5BMTYzYzIxMjktMDM4NS00MTM5LWJlMDgtNDRhMDNhOGRmY2EwXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg', 9.4, 2016, 6),
('Resident Evil 4', 'A survival horror game featuring Leon S. Kennedy as he battles a cult in rural Spain.', 'https://m.media-amazon.com/images/M/MV5BNmRjNzkzMWMtMGJhNy00MDZjLThkOWItNjRjMWQ4YWI1MDFiXkEyXkFqcGdeQXVyMTgwNDM0Nzc0._V1_.jpg', 9.2, 2005, 2),
('FIFA 2024', 'The latest installment in the FIFA series, featuring updated teams and gameplay.', 'https://m.media-amazon.com/images/M/MV5BNWIwYjMwNTItNjAwNy00ZDhjLTlkMTMtMzdmNjIwZTZiMzg3XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg', 8.8, 2024, 3),
('Red Dead Redemption II','Amidst the decline of the Wild West at the turn of the 20th century, outlaw Arthur Morgan and his gang struggle to cope with the loss of their way of life.','https://m.media-amazon.com/images/M/MV5BMjMyZDY5NTctMzQ0Ny00ZTU0LWE1ZDYtNDYzMjAxYjA1ZGYxXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg', 9.7, 2018, 5),
('Far Cry 3','While skydiving, Jason Brody and his friends land on an island overrun by pirates, where Jason is torn between fighting for the Rakyat resistance and rescuing his friends.','https://m.media-amazon.com/images/M/MV5BOTAzYzgyZmEtNjM4ZS00YTQxLWI1ZmUtYjc3ZDYwMzM0YmUwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 8.8, 2012, 8),
('Need for Speed: Most Wanted','A lone street racer must use his talents to rise to the top of the Blacklist, comprised of the 15 most elite drivers in the city of Rockport.','https://m.media-amazon.com/images/M/MV5BZGRkZmRlZTMtNzc5NC00ODU4LTk3NzItODQ5ZWQxOTgxMzdkXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg', 8.7, 2005, 3),
('Subnautica','Descend into the depths of an alien underwater world filled with wonder and peril. Craft equipment, pilot submarines and out-smart wildlife to explore lush coral reefs, volcanoes, cave systems, and more - all while trying to survive.','https://m.media-amazon.com/images/M/MV5BMDZkNDUzMTItMmMwZS00YWM2LWI0YzktNzRlYjg5OGIyOTZjXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UX1000_.jpg', 8.4, 2018, 4);

INSERT INTO games_genres (game_id, genre_id)
VALUES
(1,1),(1,3),(1,6),(2,1),(2,6),(3,1),(3,5),(3,6),(4,1),(4,2),(4,5),(4,6),(5,4),(6,1),(6,3),(6,5),(6,6),(7,1),(7,3),(7,5),(7,6),(8,3),(8,4),(8,6),(9,2),(9,3),(9,6);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
