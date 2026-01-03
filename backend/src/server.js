const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = require('./app');
const initializeDatabase = require("../utils/databaseInitializer"); // Import the initializer

const PORT = process.env.PORT || 5001;

// Initialize the database then start the server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1); // Exit if database initialization fails
  });
