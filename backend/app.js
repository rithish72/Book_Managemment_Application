const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');

// Route imports
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const genresRoutes = require('./routes/genres');

const app = express();
const dbPath = path.join(__dirname, 'bookstore.db');
let db = null;

// Middleware to attach the database instance to each request
const attachDBToRequest = (req, res, next) => {
  req.db = db;
  next();
};

// Function to initialize the database and server
const initializeDBAndServer = async () => {
  try {
    // Connect to the SQLite database
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Middlewares
    app.use(express.json()); // Parse JSON request bodies
    app.use(cors()); // Enable CORS for cross-origin requests
    app.use(attachDBToRequest); // Attach DB instance to each request

    // API routes
    app.use('/books', booksRoutes); // Ensure booksRoutes is a valid router
    app.use('/authors', authorsRoutes); // Ensure authorsRoutes is a valid router
    app.use('/genres', genresRoutes); // Ensure genresRoutes is a valid router

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Database connected successfully');
    });
  } catch (error) {
    console.error(`DB Initialization Error: ${error.message}`);
    process.exit(1);
  }
};

// Initialize the server
initializeDBAndServer();
