const pool = require("../db/connection");

exports.getAuthors = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM authors");
  res.json(rows);
};

exports.createAuthor = async (req, res) => {
  const { nombre, email, imagen } = req.body;
  const [result] = await pool.query(
    "INSERT INTO authors (nombre, email, imagen) VALUES (?, ?, ?)",
    [nombre, email, imagen]
  );
  res.json({ id: result.insertId, nombre, email, imagen });
};

exports.getAuthorPosts = async (req, res) => {
  const authorId = req.params.id;

  const [posts] = await pool.query(
    `SELECT posts.*, authors.nombre, authors.email, authors.imagen 
     FROM posts 
     JOIN authors ON posts.author_id = authors.id
     WHERE authors.id = ?`,
    [authorId]
  );

  res.json(posts);
};
