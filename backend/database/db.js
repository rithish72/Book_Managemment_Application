const Database = require('better-sqlite3');

const db = new Database('bookstore.db', { verbose: console.log });

try {
  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS Authors (
      AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Genres (
      GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Description TEXT
    );

    CREATE TABLE IF NOT EXISTS Books (
      BookID INTEGER PRIMARY KEY AUTOINCREMENT,
      Title TEXT NOT NULL,
      AuthorID INTEGER NOT NULL,
      GenreID INTEGER NOT NULL,
      Pages INTEGER,
      PublishedDate TEXT,
      FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
      FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
    );

    CREATE INDEX IF NOT EXISTS idx_books_author ON Books(AuthorID);
    CREATE INDEX IF NOT EXISTS idx_books_genre ON Books(GenreID);
  `);
} catch (err) {
  console.error('Error setting up the database schema:', err.message);
}

module.exports = db;
