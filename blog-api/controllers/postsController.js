const pool = require("../db/connection");

exports.getPosts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT posts.*, authors.nombre AS autor_nombre, authors.email AS autor_email, authors.imagen
       FROM posts
       JOIN authors ON posts.author_id = authors.id`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error obteniendo posts", err);
    res.status(500).json({ error: "Error al obtener posts" });
  }
};

exports.createPost = async (req, res) => {
  const { titulo, descripcion, categoria, author_id } = req.body;

  if (!titulo || !descripcion || !categoria || !author_id) {
    return res.status(400).json({ error: "Campos requeridos: titulo, descripcion, categoria, author_id" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO posts (titulo, descripcion, categoria, author_id) VALUES (?, ?, ?, ?)",
      [titulo, descripcion, categoria, author_id]
    );

    res.status(201).json({ id: result.insertId, titulo, descripcion, categoria, author_id });
  } catch (err) {
    console.error("Error creando post", err);
    res.status(500).json({ error: "Error al crear post" });
  }
};
