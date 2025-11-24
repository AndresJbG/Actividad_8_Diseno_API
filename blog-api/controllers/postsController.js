const pool = require("../db/connection");

exports.getPosts = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT posts.*, authors.nombre AS autor_nombre, authors.email AS autor_email, authors.imagen
     FROM posts
     JOIN authors ON posts.author_id = authors.id`
  );
  res.json(rows);
};

exports.createPost = async (req, res) => {
  const { titulo, descripcion, categoria, author_id } = req.body;

  const [result] = await pool.query(
    "INSERT INTO posts (titulo, descripcion, categoria, author_id) VALUES (?, ?, ?, ?)",
    [titulo, descripcion, categoria, author_id]
  );

  res.json({ id: result.insertId, titulo, descripcion, categoria, author_id });
};
