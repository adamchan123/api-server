const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
require("../../../model/invited_reward");

module.exports = async (req, res) => {
    let param = req.query;
    let offer = 0;
        let limit = 10;
        if(param.pageSize != undefined && param.current != undefined){
                offer = Number((param.current-1)*param.pageSize);
                limit = Number(param.pageSize)
        }
        let data = sequelizer.models.InvitedReward.findAndCountAll({
            offset:offer,
            limit:limit,
            where:{address:param.address}
        })
    res.status(200).json(result.success(data));
}
