const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Allow CORS from all origins (restrict later if needed)
app.use(cors({origin: "https://vrvsecurity-shagun-frontend.vercel.app/"}));

// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  });
};

connectDatabase();

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
