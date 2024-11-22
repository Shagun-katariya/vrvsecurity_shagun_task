const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");

const app = express();
const cors = require("cors");
app.use(cors({ origin: "https://vrvsecurity-shagun-frontend.vercel.app" }));

const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(`mongodb connected with server: ${data.connection.host}`);
  });
};

connectDatabase();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
