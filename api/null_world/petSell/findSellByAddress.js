const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
const { QueryTypes,Op } = require('sequelize');
require("../../../model/pet_transaction");

module.exports = async (req, res) => {
    const param = req.query;
    let offer = 0;
    let limit = 10;
    if(param.pageSize != undefined && param.current != undefined){
            offer = Number((param.current-1)*param.pageSize);
            limit = Number(param.pageSize)
    }
    let opention = {
        offset:offer,
        limit:limit,
        where:{
            [Op.or]: [{ buy_user_address: param.address }, { sell_user_address: param.address }],  
        }
    }
    let data = await sequelizer.models.PetTransaction.findAndCountAll(opention);
    res.status(200).json(result.success(data));
}
