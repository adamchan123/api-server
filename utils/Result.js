
const  result = {}

result.success = function(data){
    return {code:200,message:"执行成功",data:data}
}

result.error = function(message){
    return {code:500,message:message}
}



module.exports = result;