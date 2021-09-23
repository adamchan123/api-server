const {QueryTypes} = require('sequelize');
const sequelize = require('../../../config/mysql2_randoms')
const Result = require('../../../constants/result')

module.exports = async (req, res) => {

    const transactionHash = req.query.transactionHash || '';
    const logIndex = parseInt(req.query.logIndex) || 0;
    const itemId = parseInt(req.query.itemId) || 0;

    const sql = 'select GameWrite.rv as RandomNumber,GameWrite.createTime as Data,GameWrite.hv as HV,NewNonce.nonce as Nonce,\n' +
        'GameWrite.transactionHash,GameWrite.player as PlayerHash,NewGame.gameName,NewGame.gameId,NewGame.mng,\n' +
        'NewGameScene.sceneName,NewGameScene.sceneId,NewGameItem.itemId,NewGameItem.pubkey \n' +
        'from GameWrite,NewGame,NewGameScene,NewGameItem,NewNonce\n' +
        'WHERE GameWrite.gameId=NewGame.gameId \n' +
        'and GameWrite.sceneId=NewGameScene.sceneId \n' +
        'and GameWrite.itemId=NewGameItem.itemId\n' +
        'and GameWrite.hv=NewNonce.hv\n' +
        'and GameWrite.transactionHash=?\n' +
        'and GameWrite.logIndex=?\n' +
        'and GameWrite.itemId=?';
    const querySql = 'SELECT privateKey FROM PublishPrivateKey WHERE itemId=?';

    const result = await sequelize.query(sql, {
        replacements: [transactionHash, logIndex, itemId],
        type: QueryTypes.SELECT
    });
    const privateKey = await sequelize.query(querySql, {
        replacements: [itemId],
        type: QueryTypes.SELECT
    });

    const data = Result.privateKeyResult(result, privateKey);

    res.status(200).json(data);
}
