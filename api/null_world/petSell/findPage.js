const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
const { QueryTypes } = require('sequelize');

module.exports = async (req, res) => {
    let param = req.query;
    let offer = 0;
    let limit = 10;
    if(param.pageSize != undefined && param != undefined){
            offer = Number((param.current-1)*param.pageSize);
            limit = Number(param.pageSize)
    }
    let sql = "select ps.id,ps.pet_id,ps.current,ps.current_contract,ps.price,p.type,p.image from  pet_sell ps left  join pet p on ps.pet_id = p.pet_id where ps.status = 1 ";
    let count_sql = "select count(ps.pet_id) from  pet_sell ps left  join pet p on ps.pet_id = p.pet_id where ps.status = 1 ";
    if(param.type == 1){
        sql+= " and p.type = 255 ";
        count_sql+= " and p.type = 255 ";
    }
    if(param.type == 2){
        sql+= " and p.type <> 255 ";
        count_sql+= " and p.type <> 255 ";
    }
    sql+= ' order by ps.create_time  limit ?,?'
    let list = await sequelizer.query(sql,{
        replacements: [offer,limit],
        type: QueryTypes.SELECT
      })
    let count = await sequelizer.query(count_sql,{
        type: QueryTypes.SELECT
      })
      let data = {
          count:count[0]['count(ps.pet_id)'],
          row:list
      }
    res.status(200).json(result.success(data));
}
