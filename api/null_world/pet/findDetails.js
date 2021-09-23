require("../../../model/pet");
require("../../../model/pet_transaction");
require("../../../model/ring_record");
const  sequelizer = require("../../../config/mysql2");
const  result = require("../../../utils/Result");


module.exports = async (req, res) => {
    let  address = req.query.address;
    let  petId = req.query.petId;

     //查询恐龙信息
     let pet = await sequelizer.models.Pet.findByPk(petId);
     if(pet == null){
         return null;
     }
     //查询 恐龙的出售记录
     let list = await sequelizer.models.PetTransaction.findAll({
         where:{pet_id:petId}
     })
     // 查询恐龙的 战绩
     let ringRecord = [];
     if(pet.type != 255){
         ringRecord = await sequelizer.models.RingRecord.findAll({
             where:{challenger_pet_id:petId}
         })
     }else{
         ringRecord = await sequelizer.models.RingRecord.findAll({
             where:{ring_pet_id:petId}
         })
     }

     let data = {
         pet:pet,
         sellRecord:list,
         ringRecord:ringRecord
     }
    res.status(200).json(result.success(data));
}
