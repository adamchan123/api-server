const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
require("../../../model/ring_record");

module.exports = async (req, res) => {
    let id = req.query.id;
    if (id == undefined && id.length == 0) {
        res.status(200).json(result.errot("id 不能为空"));
        return
    }
    let param = {
        where: {
          item_id: id
        }
      }
    let data =  await sequelizer.models.RingRecord.findAll(param);
    res.status(200).json(result.success(data));
}
