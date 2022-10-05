const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into users(id_angkatan, username, password, nama, jenis_kelamin, kelas, role, coin, image, terakhir_login) 
                values(?,?,?,?,?,?,?,?,?,?)`,
      [
        data.id_angkatan,
        data.username,
        data.password,
        data.nama,
        data.jenis_kelamin,
        data.kelas,
        data.role,
        data.coin,
        data.image,
        new Date(Date.now()).toString(),
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAll: (callBack) => {
    pool.query(
      `SELECT a.*,s.id_user,s.username,s.nama,s.jenis_kelamin,s.kelas,s.role,s.coin,s.image,s.terakhir_login FROM users as s JOIN angkatan as a ON s.id_angkatan = a.id_angkatan`,
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
      `SELECT a.*,s.id_user,s.username,s.nama,s.jenis_kelamin,s.kelas,s.role,s.coin,s.image,s.terakhir_login FROM users as s JOIN angkatan as a ON s.id_angkatan = a.id_angkatan WHERE s.id_user = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateAdmin: (data, callBack) => {
    pool.query(
      `UPDATE users SET nama=?, username=? WHERE id_user=?`,
      [data.nama, data.username, data.id_user],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateClient: (data, callBack) => {
    pool.query(
      `UPDATE users SET id_angkatan=?, nama=?, jenis_kelamin=?, kelas=? WHERE id_user=?`,
      [
        data.id_angkatan,
        data.nama,
        // data.username,
        // data.password,
        data.jenis_kelamin,
        data.kelas,
        data.id_user,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateTerakhirLogin: (data, callBack) => {
    pool.query(
      `UPDATE users SET terakhir_login=? WHERE id_user=?`,
      [new Date(Date.now()).toString(), data.id_user],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateFotoProfil: (data, callBack) => {
    pool.query(
      `UPDATE users SET image=? WHERE id_user=?`,
      [data.image, data.id_user],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateCoin: (data, callBack) => {
    pool.query(
      `UPDATE users SET coin=? WHERE id_user=?`,
      [data.coin, data.id_user],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM users WHERE id_user=?`,
      [data.id_user],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteAllUserByIdAngkatan: (data, callBack) => {
    pool.query(
      `DELETE FROM users WHERE id_angkatan=?`,
      [data.id_angkatan],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserbyUsername: (username, callBack) => {
    pool.query(
      `SELECT * FROM users WHERE username=?`,
      [username],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
