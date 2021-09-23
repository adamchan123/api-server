const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
require("../../../model/address_invited");

module.exports = async (req, res) => {
    let param = req.query;
    let offer = 0;
    let limit = 10;
    if(param.pageSize != undefined && param.current != undefined){
            offer = Number((param.current-1)*param.pageSize);
            limit = Number(param.pageSize)
    }

    let data = sequelizer.models.AddressInvited.findAndCountAll({
        offset:offer,
        limit:limit,
        where:{address:param.address},
        order:[["create_time","desc"]]
    })

    res.status(200).json(result.success(data));
}
