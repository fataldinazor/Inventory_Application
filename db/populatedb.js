const {Client}= require('pg');
const path = require('path');
require('dotenv').config({
    override:true,
    path:path.join(__dirname, "../.env.development")
})

const SQL=`
CREATE TABLE IF NOT EXISTS developers(
developer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
developer VARCHAR(127)
);

CREATE TABLE IF NOT EXISTS games(
game_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255) NOT NULL,
description VARCHAR(1000),
cover_image VARCHAR(255),
rating DECIMAL(2,1),
year INTEGER,
developer_id INTEGER,
FOREIGN KEY (developer_id) REFERENCES developers(developer_id)
);

CREATE TABLE IF NOT EXISTS genres(
genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
genre VARCHAR(127)
);

CREATE TABLE IF NOT EXISTS games_genres(
game_id INT,
genre_id INT,
PRIMARY KEY(game_id, genre_id),
FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

INSERT INTO genres (genre) 
VALUES
('Action'), ('Horror'), ('Open World'), ('Sports'), ('Shooting'), ('Story');

INSERT INTO developers (developer)
VALUES 
('Activsion'), ('Capcom'), ('EA Sports'), ('Epic Games'), ('Rockstar Games'), ('Sony'), ('Steam'), ('Ubisoft');

INSERT INTO games (name, description, cover_image, rating, year, developer_id ) 
VALUES
('Grand Theft Auto V', 'An open-world action-adventure game set in the fictional state of San Andreas.', 'https://m.media-amazon.com/images/M/MV5BYjEzMTM4ZmQtZTEzYS00ZGVmLTkwM2EtNWNmMDI4OWQ0MjBmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg', 9.5, 2013, 5),
('God of War', 'An action-adventure game following Kratos and his son on a quest in Norse mythology.', 'https://m.media-amazon.com/images/M/MV5BZjc2NmExYWEtMTllNi00NTc5LTliZDgtMWRmMjQzMjg1NDJmXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg', 9.6, 2018, 6),
('Uncharted 4: A Thiefs End', 'An action-adventure game featuring treasure hunter Nathan Drake on his final adventure.','https://m.media-amazon.com/images/M/MV5BMTYzYzIxMjktMDM4NS00MTM5LWJlMDgtNDRhMDNhOGRmY2EwXkEyXkFqcGdeQXVyMTk2OTAzNTI@._V1_.jpg', 9.4, 2016, 6),
('Resident Evil 4', 'A survival horror game featuring Leon S. Kennedy as he battles a cult in rural Spain.', 'https://m.media-amazon.com/images/M/MV5BNmRjNzkzMWMtMGJhNy00MDZjLThkOWItNjRjMWQ4YWI1MDFiXkEyXkFqcGdeQXVyMTgwNDM0Nzc0._V1_.jpg', 9.2, 2005, 2),
('FIFA 2024', 'The latest installment in the FIFA series, featuring updated teams and gameplay.', 'https://m.media-amazon.com/images/M/MV5BZWIwOWU3MDUtZjY5MS00YzBjLWI0ODEtMWE0NjBiNjJjNWVkXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg', 8.8, 2024, 3);

INSERT INTO games_genres (game_id, genre_id)
VALUES
(1,1),(1,3),(1,6),(2,1),(2,6),(3,1),(3,5),(3,6),(4,1),(4,2),(4,5),(4,6),(5,4);
`

async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();