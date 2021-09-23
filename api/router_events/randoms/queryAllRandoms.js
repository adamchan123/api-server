const {QueryTypes} = require('sequelize');
const sequelize = require('../../../config/mysql2_randoms')
const Result = require('../../../constants/result')

module.exports = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const gameId = parseInt(req.query.gameId);
    const sceneId = parseInt(req.query.sceneId);
    const itemId = parseInt(req.query.itemId);
    const player = req.query.player;

    let sql = 'SELECT GameWrite.blockNumber,GameWrite.transactionHash AS HASH,NewGame.gameName AS Game,GameWrite.sceneId AS ScenesId,GameWrite.itemId AS ItemId,GameWrite.player AS PlayerAddress,GameWrite.rv AS RV,GameWrite.createTime AS Time FROM GameWrite,NewGame WHERE GameWrite.gameId=NewGame.gameId';
    let querySql = 'SELECT sum(randoms) as count FROM StatisticsGameId';
    if (!isNaN(gameId)) {
        sql += ' and GameWrite.gameId=' + gameId;
        querySql += ' where StatisticsGameId.gameId=' + gameId;
    }
    if (!isNaN(sceneId)) {
        sql += ' and GameWrite.sceneId=' + sceneId;
        querySql = 'SELECT sum(randoms) as count FROM StatisticsSceneId where StatisticsSceneId.sceneId=' + sceneId;
    }
    if (!isNaN(itemId)) {
        sql += ' and GameWrite.itemId=' + itemId;
        querySql = 'SELECT sum(randoms) as count FROM StatisticsItemId where StatisticsItemId.itemId=' + itemId;
    }
    if (player !== undefined && player !== '') {
        sql += ' and GameWrite.player=' + mysql.expect(player);
        querySql = 'select count(GameWrite.rv) as count from GameWrite where GameWrite.player=' + mysql.expect(player);
    }
    sql += ' ORDER BY GameWrite.createTime DESC limit ? offset ?';

    const result = await sequelize.query(sql, {
        replacements: [limit, (page - 1) * limit],
        type: QueryTypes.SELECT
    });
    const total = await sequelize.query(querySql, {type: QueryTypes.SELECT});

    const totalNumber = total[0].count;
    const data = Result.pageResult(page, limit, totalNumber, result);

    res.status(200).json(data);
}
