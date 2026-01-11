const express = require("express");
const router = express.Router();

const {
  createMember,
  getAllMembers,
  getMemberById,
} = require("../controllers/memberController");

router.post("/", createMember);
router.get("/", getAllMembers);
router.get("/:id", getMemberById);

module.exports = router;
