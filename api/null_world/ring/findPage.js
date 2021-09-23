const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
const { QueryTypes,Op } = require('sequelize');
require("../../../model/ring");
require("../../../model/item_commit_log");

module.exports = async (req, res) => {
    const { status, current, pageSize, sort, number } = req.query;   
    let offer = 0;
    let limit = 10;
    if(pageSize != undefined && current != undefined){
            offer = Number((current-1)*pageSize);
            limit = Number(pageSize)
    }

    const where = {};
    if (status != 0) where.status = status
    if (number?.length > 0) where.item_id = number
    const list = await sequelizer.models.Ring.findAndCountAll({
        offset: offer,
        limit: limit,
        where, 
        order: [["createTime", 'desc']],
    })
    list.rows.every(async function(ring){
        //查询排队列表
        let list = await sequelizer.models.ItemCommitLog.findAll({
            where:{ 
                item_id:ring.item_id, 
                nonce:{ [Op.gte]: ring.nonce},
                status:0
            }
        });
        ring.dataValues.list = list
    })
    res.status(200).json(result.success(list));
}
