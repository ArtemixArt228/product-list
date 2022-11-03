const { Router } = require("express");
// eslint-disable-next-line new-cap
const router = Router();

const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comments");

router.route("/").post(createComment);
router.route("/:id").get(getComments).delete(deleteComment);

module.exports = router;
