const {QueryTypes} = require('sequelize');
const sequelize = require('../../../config/mysql2_randoms')
const Result = require('../../../constants/result')

module.exports = async (req, res) => {

    const sceneId = parseInt(req.query.sceneId) || 0;

    const sql = 'SELECT NewGameScene.sceneName,NewGameScene.sceneId,NewGame.gameName,NewGameScene.createTime AS Date,NewGameScene.sender AS AdminAddress FROM NewGame,NewGameScene WHERE NewGame.gameId=NewGameScene.gameId AND NewGameScene.sceneId=?';

    const result = await sequelize.query(sql, {
        replacements: [sceneId],
        type: QueryTypes.SELECT
    });
    const data = Result.commonResult(result);

    res.status(200).json(data);
}
