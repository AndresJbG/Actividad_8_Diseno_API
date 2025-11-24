const express = require("express");
const router = express.Router();
const controller = require("../controllers/authorsController");

router.get("/", controller.getAuthors);
router.post("/", controller.createAuthor);
router.get("/:id/posts", controller.getAuthorPosts);

module.exports = router;
