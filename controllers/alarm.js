const connection = require("../db/mysql_connection");

//@desc             내 게시물을 좋아요 했을때 알림 표시
//@route            GET/api/v1/alarm/postlikealarm?offset=0&limit=25
//@request          user_id(auth), offset, limit
//@response         success, items
exports.postlikealarm = async (req, res, next) => {
  let user_id = req.user.id;
  let offset = req.query.offset;
  let limit = req.query.limit;

  let query =
    "select u.user_profilephoto, u.user_name as user_name, \
    p.id as post_id, p.photo_url, pl.created_at \
    from postlike as pl \
    join post as p \
    on pl.post_id = p.id \
    join user as u \
    on pl.user_id = u.id \
    where p.user_id = ? \
    order by pl.created_at desc \
    limit ?, ?";

  let data = [user_id, Number(offset), Number(limit)];
  try {
    [rows] = await connection.query(query, data);
    res.status(200).json({ success: true, items: rows });
  } catch (e) {
    res.status(500).json({ success: false, error: e });
  }
};