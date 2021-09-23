const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
const { QueryType,Op  } = require('sequelize');
require("../../../model/ring_record");

module.exports = async (req, res) => {
    let param ={
      address:req.query.address,
      pageSize:req.query.pageSize,
      current:req.query.current,
      type:req.query.type
    } 
    if(param.address == undefined || param.pageSize == undefined || param.current ==undefined || param.type == undefined ){
        res.status(200).json(result.error("参数不合法"));
      return;
    }
    let {address,type,current,pageSize} = param;
        let offer = 0;
        let limit = 10;
        if(pageSize != undefined && current != undefined){
                offer = Number((current-1)*pageSize);
                limit = Number(pageSize)
        }
        let where;
        if(type == 0){
            where = {
                [Op.or]: [{ ring_address: address }, { challenger_address: address }],
            };
        }else if(type == 1){
            where = {
                ring_address: address
            };
        }else{
            where = {
                challenger_address: address
            };
        }
        let data = await sequelizer.models.RingRecord.findAndCountAll({
            offset:offer,
            limit:limit,
            where:where,
            order:[["create_time","DESC"]]
        });
    res.status(200).json(result.success(data));
}
