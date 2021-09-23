const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
const { QueryTypes } = require('sequelize');


module.exports = async (req, res) => {
    let  param = req.query;
    let  startTime;
    let  endTime = new Date().getTime() ;
    if(param.type == 1){
        startTime = new Date().getTime() - 24*60**60*1000;
    }
    if(param.type == 2){
        startTime = new Date().getTime() - 7*24*60**60*1000;
    }
    if(param.type == 2){
        startTime = new Date().getTime() - 30*24*60*60*1000;
    }
    let max_jackpot = await sequelizer.query( 'select  if(max(jackpot) is null,0,max(jackpot)) as total  from  ring  where   createTime >  ? and createTime < ? and status in (1,2) ;',{
        replacements: [startTime,endTime],
        type: QueryTypes.SELECT
    })
    console.log(max_jackpot);

    let sum_jackpot = await sequelizer.query( 'select   if(sum(jackpot) is null,0,sum(jackpot)) as total from  ring  where   createTime >  ? and createTime < ? and status in (1,2) ;',{
        replacements: [startTime,endTime],
        type: QueryTypes.SELECT
    })
    console.log(sum_jackpot);

    let history_max_jackpot = await sequelizer.query( 'select  if(sum(max_jackpot) is null,0,sum(max_jackpot))as total  from  ring  where   createTime >  ? and createTime < ?;',{
        replacements: [startTime,endTime],
        type: QueryTypes.SELECT
    })
    let data = {
        max_jackpot: max_jackpot[0]['total'],
        sum_jackpot: sum_jackpot[0]['total'],
        history_max_jackpot: history_max_jackpot[0]['total'] 
    }
    res.status(200).json(result.success(data));
}
