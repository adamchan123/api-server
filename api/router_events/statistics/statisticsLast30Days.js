const {QueryTypes} = require('sequelize');
const sequelize = require('../../../config/mysql2_randoms')
const Result = require('../../../constants/result')

module.exports = async (req, res) => {

    const sql = 'SELECT IFNULL(temp.count,0) AS count FROM (\n' +
        'SELECT @s :=@s+1 AS indexs,DATE_FORMAT(DATE(DATE_SUB(CURRENT_DATE,INTERVAL @s DAY)),\'%Y-%m-%d\') AS dates FROM mysql.help_topic,(\n' +
        'SELECT @s :=-1) temp WHERE @s< 29 ORDER BY dates) date_table LEFT JOIN (\n' +
        'SELECT LEFT (createTime,10) AS dateValue,count(*) AS count FROM GameWrite GROUP BY LEFT (createTime,10)) temp ON date_table.dates=temp.dateValue ORDER BY date_table.dates;\n';

    const body = await sequelize.query(sql, {type: QueryTypes.SELECT});

    const result = [];
    for (let index = 0; index < 30; index++) {
        result.push(body[index].count);
    }
    const data = Result.commonResult(result);

    res.status(200).json(data);
}
