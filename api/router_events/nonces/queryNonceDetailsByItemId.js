const {QueryTypes} = require('sequelize');
const sequelize = require('../../../config/mysql2_randoms')
const Result = require('../../../constants/result')

module.exports = async (req, res) => {

    const itemId = parseInt(req.query.itemId) || 0;
    const nonce = parseInt(req.query.nonce) || 0;

    const sql = 'SELECT NewNonce.nonce,NewNonce.createTime AS DATA,NewNonce.hv,NewNonce.transactionHash,NewNonce.player,NewGame.gameName,NewGame.gameId,NewGame.mng AS AdminAddress,NewGameScene.sceneName,NewGameScene.sceneId,NewNonce.itemId FROM NewNonce,NewGame,NewGameScene WHERE NewNonce.gameId=NewGame.gameId AND NewNonce.sceneId=NewGameScene.sceneId AND NewNonce.itemId=? AND NewNonce.nonce=?';
    const querySql = 'SELECT privateKey FROM PublishPrivateKey WHERE itemId=?';

    const result = await sequelize.query(sql, {
        replacements: [itemId, nonce],
        type: QueryTypes.SELECT
    });
    const privateKey = await sequelize.query(querySql, {
        replacements: [itemId],
        type: QueryTypes.SELECT
    });

    const data = Result.privateKeyResult(result, privateKey);

    res.status(200).json(data);
}
