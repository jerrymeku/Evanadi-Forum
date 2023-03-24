const pool = require("../../config/database");

module.exports = {
  addQuestion: (data, callback) => {
    //inserting data to question table
    pool.query(
      `INSERT INTO question(question,question_description,post_id,user_id)VALUES(?,?,?,?)`,
      [data.question, data.questionDescription, data.postId, data.userId],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getQuestions: (callback) => {
    pool.query(
      `SELECT registration.user_name, question, question_description,post_id FROM question JOIN registration ON question.user_id = registration.user_id ORDER BY question_id DESC`,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  questionById: (id, callback) => {
    pool.query(
      `SELECT * FROM question WHERE post_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
