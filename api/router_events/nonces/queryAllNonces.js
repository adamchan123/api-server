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

    let sql = 'SELECT NewNonce.blockNumber,NewNonce.transactionHash AS HASH,NewGame.gameName AS Game,NewNonce.sceneId,NewNonce.itemId,NewNonce.player AS PlayerAddress,NewNonce.nonce,NewNonce.createTime AS Time FROM NewNonce,NewGame WHERE NewNonce.gameId=NewGame.gameId';
    let querySql = 'SELECT sum(nonces) as count FROM StatisticsGameId';
    if (!isNaN(gameId)) {
        sql += ' and NewNonce.gameId=' + gameId;
        querySql += ' where StatisticsGameId.gameId=' + gameId;
    }
    if (!isNaN(sceneId)) {
        sql += ' and NewNonce.sceneId=' + sceneId;
        querySql = 'SELECT sum(nonces) as count FROM StatisticsSceneId where StatisticsSceneId.sceneId=' + sceneId;
    }
    if (!isNaN(itemId)) {
        sql += ' and NewNonce.itemId=' + itemId;
        querySql = 'SELECT sum(nonces) as count FROM StatisticsItemId where StatisticsItemId.itemId=' + itemId;
    }
    if (player !== undefined && player !== '') {
        sql += ' and NewNonce.player=' + mysql.expect(player);
        querySql = 'select count(NewNonce.hv) as count from NewNonce where NewNonce.player=' + mysql.expect(player);
    }
    sql += ' ORDER BY NewNonce.createTime DESC limit ? offset ?';

    const result = await sequelize.query(sql, {
        replacements: [limit, (page - 1) * limit],
        type: QueryTypes.SELECT
    });
    const total = await sequelize.query(querySql, {type: QueryTypes.SELECT});

    const totalNumber = total[0].count;
    const data = Result.pageResult(page, limit, totalNumber, result);

    res.status(200).json(data);
}
