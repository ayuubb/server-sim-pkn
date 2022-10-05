const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  create,
  getAll,
  getById,
  deleteUser,
  deleteAllUserByIdAngkatan,
  getUserbyUsername,
  updateTerakhirLogin,
  updateAdmin,
  updateClient,
  updateFotoProfil,
  updateCoin,
} = require("./user.service");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }

      return res.status(201).json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getAll((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Record not Found",
        });
      }

      results.password = undefined;
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updateGuru: (req, res) => {
    const body = req.body;

    updateAdmin(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.status(201).json({
        success: 1,
        message: "update successfully",
      });
    });
  },
  updateSiswa: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password[0], salt);

    updateClient(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.status(201).json({
        success: 1,
        message: "update successfully",
      });
    });
  },
  updateFotoProfil: (req, res) => {
    const body = req.body;
    updateFotoProfil(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.status(201).json({
        success: 1,
        message: "update successfully",
      });
    });
  },
  updateCoin: (req, res) => {
    const body = req.body;

    getById(body.id_user, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Record not Found",
        });
      }

      // tipe digunakan untuk membedakan coin akan ditambah atau dikurangi
      if (body.tipe === "tambah") {
        body.coin = body.coin + results.coin;
      } else if (body.tipe === "kurang") {
        body.coin = results.coin - body.coin;
      }

      updateCoin(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }

        return res.status(201).json({
          success: 1,
          message: "update successfully",
        });
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.status(200).json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
  deleteAllUserByIdAngkatan: (req, res) => {
    const data = req.body;
    console.log(data);
    deleteAllUserByIdAngkatan(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.status(200).json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserbyUsername(body.username, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          data: "Invalid username or password",
        });
      }

      const result = compareSync(body.password, results.password);

      if (result) {
        updateTerakhirLogin(results, (err, results2) => {
          if (err) {
            console.log(err);
          }

          results.password = undefined;
          const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
            expiresIn: "1d",
          });

          return res.status(200).json({
            success: 1,
            message: "login successfully",
            token: jsontoken,
            uid: results.id_user,
            role: results.role,
          });
        });
      } else {
        return res.status(401).json({
          success: 0,
          data: "Invalid username or password",
        });
      }
    });
  },
};
