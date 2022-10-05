const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUserByUserId,
  updateGuru,
  updateSiswa,
  updateFotoProfil,
  updateCoin,
  deleteUser,
  login,
  deleteAllUserByIdAngkatan,
} = require("./user.controller");
const { checkToken } = require("../../auth/token_validation");

router.post("/login", login);
router.post("/", checkToken, createUser);
router.get("/", getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.put("/update_guru", checkToken, updateGuru);
router.put("/update_siswa", checkToken, updateSiswa);
router.put("/update_foto", checkToken, updateFotoProfil);
router.put("/update_coin", checkToken, updateCoin);
router.delete("/", checkToken, deleteUser);
router.delete("/deleteByIdAngkatan", checkToken, deleteAllUserByIdAngkatan);

module.exports = router;
