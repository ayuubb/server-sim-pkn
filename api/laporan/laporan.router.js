const router = require("express").Router();
const {
  getAll, getById, login
} = require("./laporan.controller");
const { checkToken } = require("../../auth/token_validation");

// router.post("/login", login);
router.get("/", getAll);
router.get("/:id", checkToken, getById);

module.exports = router;
