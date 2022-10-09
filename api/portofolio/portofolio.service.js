const pool = require("../../config/database");

module.exports = {
  getAll: (callBack) => {
    pool.query(
      `SELECT * from table_portofolio`,
      // `SELECT id_user,username,nama,jenis_kelamin,kelas,role,coin,image,terakhir_login FROM users`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getById: (id, callBack) => {
    pool.query(
      `SELECT * FROM table_portofolio WHERE nim = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
