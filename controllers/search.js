const connection = require("../db/mysql_connection");
const validator = require("validator");

//@desc             유저 검색
//@route            GET/api/v1/searchuser?user=@a
//@request          user_id
//@response         success, items
exports.searchuser = async (req, res, next) => {
  let user = req.query.user;
  let offset = req.query.offset;
  let limit = req.query.limit;
  let string = "@"
  let query = `select u.user_name, u.user_profilephoto \
                from user as u \ 
                where u.user_name like "%${user}%" \
                limit ${offset}, ${limit}`;
  try {
    [rows] = await connection.query(query);
    if (user.includes(string)==true) {
      res.status(200).json({ success: true, items: rows });
   }
  } catch (e) {
    res.status(500).json({ success: false, error: e });
  }
};
