const {QueryTypes} = require('sequelize');
const sequelize = require('../../../config/mysql2_randoms')
const Result = require('../../../constants/result')

module.exports = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const gameAddress = req.query.gameAddress;

    let sql = 'SELECT NewGame.gameId,NewGame.gameName AS Game,NewGame.game AS GameAddress,StatisticsGameId.scenes AS Scenes,StatisticsGameId.items AS Items,StatisticsGameId.randoms AS Randoms,NewGame.createTime AS Time FROM NewGame,StatisticsGameId WHERE NewGame.gameId=StatisticsGameId.gameId';
    let querySql = 'SELECT count(StatisticsGameId.gameId) as count FROM StatisticsGameId';
    if (gameAddress !== undefined && gameAddress !== '') {
        sql += ' and NewGame.game=' + mysql.escape(gameAddress);
        querySql += ',NewGame WHERE StatisticsGameId.gameId=NewGame.gameId AND NewGame.game=' + mysql.escape(gameAddress);
    }
    sql += ' ORDER BY NewGame.createTime DESC limit ? offset ?';

    const result = await sequelize.query(sql, {
        replacements: [limit, (page - 1) * limit],
        type: QueryTypes.SELECT
    });
    const total = await sequelize.query(querySql, {type: QueryTypes.SELECT});
    const totalNumber = total[0].count;
    const data = Result.pageResult(page, limit, totalNumber, result);

    res.status(200).json(data);
}
