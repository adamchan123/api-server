const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");
require("../../../model/pet");

module.exports = async (req, res) => {
    let address = req.query.address;
    let param = {
        where:{'owner_address':address,'type':255,'status':4},
    }
    let data = await sequelizer.models.Pet.findAll(param);
    res.status(200).json(result.success(data));
}
