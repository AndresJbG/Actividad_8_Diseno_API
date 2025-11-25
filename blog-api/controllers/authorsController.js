const pool = require("../db/connection");

exports.getAuthors = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM authors");
    res.json(rows);
  } catch (err) {
    console.error("Error obteniendo autores", err);
    res.status(500).json({ error: "Error al obtener autores" });
  }
};

exports.createAuthor = async (req, res) => {
  const { nombre, email, imagen } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Campos requeridos: nombre, email" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO authors (nombre, email, imagen) VALUES (?, ?, ?)",
      [nombre, email, imagen || null]
    );
    res.status(201).json({ id: result.insertId, nombre, email, imagen: imagen || null });
  } catch (err) {
    console.error("Error creando autor", err);
    res.status(500).json({ error: "Error al crear autor" });
  }
};

exports.getAuthorPosts = async (req, res) => {
  const authorId = req.params.id;

  try {
    const [posts] = await pool.query(
      `SELECT posts.*, authors.nombre, authors.email, authors.imagen 
       FROM posts 
       JOIN authors ON posts.author_id = authors.id
       WHERE authors.id = ?`,
      [authorId]
    );

    res.json(posts);
  } catch (err) {
    console.error("Error obteniendo posts de autor", err);
    res.status(500).json({ error: "Error al obtener posts del autor" });
  }
};
