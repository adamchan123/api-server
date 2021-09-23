const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
const { QueryTypes } = require('sequelize');

module.exports = async (req, res) => {
    let address = req.query.address;
    let sql = "select * from pet where owner_address = ? and type <> 255  and status = 4";
    let data = await sequelizer.query(sql,{
        replacements: [address],
        type: QueryTypes.SELECT
      })
    res.status(200).json(result.success(data));
}
