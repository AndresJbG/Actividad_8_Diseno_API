const express = require("express");
require("dotenv").config();

const postsRoutes = require("./routes/posts");
const authorsRoutes = require("./routes/authors");

const app = express();
app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/authors", authorsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
