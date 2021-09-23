const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
require("../../../model/token_info");

module.exports = async (req, res) => {
    const param = ctx.query;
    const { token, chainid} = param

    let data= sequelizer.models.TokenInfo.findOne({where:{token_address:token,chainid:chainid}});

    res.status(200).json(result.success(data));
}
