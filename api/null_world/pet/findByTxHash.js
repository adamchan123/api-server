const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
require("../../../model/pet");

module.exports = async (req, res) => {
    let tx_hash  = req.query.tx_hash;
    if(tx_hash == undefined){
        res.status(200).json(result.error("参数不合法"));
      return;
    }
    let param = {
        where:{'tx_hash':tx_hash}
    }
    let data = await sequelizer.models.Pet.findAll(param);

    res.status(200).json(result.success(data));
}
