const pool = require("../../config/database");

module.exports = {
  addAnswer: (data, callback) => {

    // inserting data to answer table
    
    pool.query(
      `INSERT INTO answer(answer,user_id,question_id)VALUES(?,?,?)`,
      [data.Qanswer, data.userId, data.questionId],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getAnswer: (ques_id, callback) => {
    pool.query(
      `SELECT registration.user_name, answer,question_id FROM answer
 JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ?`,
      [ques_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
