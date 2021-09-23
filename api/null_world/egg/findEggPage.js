const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
require("../../../model/egg_transaction");

module.exports = async (req, res) => {
    let param = {
         address : req.query.address,
         pageSize :  req.query.pageSize,
         current :  req.query.current,
    }

    let where = {};
    if(param.address!=undefined){
        where.to_address = param.address;
    }
   
    let offset = 0;
    let limit = 10;
    if(param.pageSize != undefined && param != undefined){
            offset = Number((param.current-1)*param.pageSize);
            limit = Number(param.pageSize)
    }
    let data = await sequelizer.models.EggTransaction.findAndCountAll({
        limit: limit,
        offset:offset,
        where:where,
        order:[["create_time","desc"]]
    });

    res.status(200).json(result.success(data));
}
