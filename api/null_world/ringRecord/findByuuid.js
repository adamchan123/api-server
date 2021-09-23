const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
require("../../../model/ring_record");

module.exports = async (req, res) => {
    let uuid = req.query.uuid;
    if(uuid =='' || uuid==undefined ||uuid==null){
      res.status(200).json(result.error("uuid不能为空"));
      return
    }
    let param = {
        where:{uuid:uuid}
    }
    let data = await sequelizer.models.RingRecord.findOne(param);
    res.status(200).json(result.success(data));
}
