async function getOrCreateAuthor(db, name) {
    const [existingAuthor] = await db.all("SELECT AuthorID FROM Authors WHERE Name = ?", [name]);
    if (existingAuthor) return existingAuthor.AuthorID;
  
    const authorResult = await db.run("INSERT INTO Authors (Name) VALUES (?)", [name]);
    return authorResult.lastID;
  }
  
  async function getOrCreateGenre(db, name) {
    const [existingGenre] = await db.all("SELECT GenreID FROM Genres WHERE Name = ?", [name]);
    if (existingGenre) return existingGenre.GenreID;
  
    const genreResult = await db.run("INSERT INTO Genres (Name) VALUES (?)", [name]);
    return genreResult.lastID;
  }
  
  module.exports = { getOrCreateAuthor, getOrCreateGenre };
  