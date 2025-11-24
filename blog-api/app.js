const express = require("express");
require("dotenv").config();

const postsRoutes = require("./routes/posts");
const authorsRoutes = require("./routes/authors");

const app = express();
app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/authors", authorsRoutes);

app.listen(3000, () => console.log("API running on port 3000"));
