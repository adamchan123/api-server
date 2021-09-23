require("../../../model/pet");
require("../../../model/pet_sell");
require("../../../model/pet_transaction");
const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");


module.exports = async (req, res) => {
    let id = req.query.id;
    console.log("==============================id==========",id)
    let petSell = await sequelizer.models.PetSell.findByPk(id);
    let list = [];
    if(petSell!=null){
        let pet = await sequelizer.models.Pet.findByPk(petSell.pet_id);
        if(pet!=null){
            petSell.dataValues.type = pet.type;
        }
        //查询恐龙成交记录
        let option = {
            where:{pet_id:petSell.pet_id}
        }
        list = await sequelizer.models.PetTransaction.findAll(option);
    }

    let data = {
        petSell:petSell,
        transaction:list
    }
    res.status(200).json(result.success(data));
}
