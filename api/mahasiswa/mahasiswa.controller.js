const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  getAll, getById
} = require("./mahasiswa.service");

module.exports = {
  getAll: (req, res) => {
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
  getById: (req, res) => {
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
  login: (req, res) => {
    const body = req.body;
    getById(body.nim, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          data: "Invalid nim or password",
        });
      }

      // const result = compareSync(body.password, results.password);

      if (body.password === results.password) {
        results.password = undefined;
        results.password2 = undefined;

        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          uid: results.nim,
        });
      } else {
        return res.status(401).json({
          success: 0,
          data: "Invalid nim or password",
        });
      }
    });
  },
};
