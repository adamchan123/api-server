const {QueryTypes} = require('sequelize');
const sequelize = require('../../../config/mysql2_randoms')
const Result = require('../../../constants/result')

module.exports = async (req, res) => {

    const itemId = parseInt(req.query.itemId) || 0;

    const sql = 'SELECT NewGameItem.createTime AS DATA,NewGame.gameName,NewGame.gameId,NewGame.mng AS AdminAdress,NewGameScene.sceneName,NewGameScene.sceneId,NewGameItem.itemId,NewGameItem.pubkey FROM NewGame,NewGameScene,NewGameItem WHERE NewGame.gameId=NewGameItem.gameId AND NewGameScene.sceneId=NewGameItem.sceneId AND NewGameItem.itemId=?';
    const querySql = 'SELECT privateKey FROM PublishPrivateKey WHERE itemId=?';

    const result = await sequelize.query(sql, {
        replacements: [itemId],
        type: QueryTypes.SELECT
    });
    const privateKey = await sequelize.query(querySql, {
        replacements: [itemId],
        type: QueryTypes.SELECT
    });

    const data = Result.privateKeyResult(result, privateKey);

    res.status(200).json(data);
}
