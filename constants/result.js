const codeNumber = require('./code')
const Result = {}

Result.commonResult = function (result) {
    return {
        code: codeNumber.success,
        result
    }
}

Result.privateKeyResult = function (result, privateKey) {
    return {
        code: codeNumber.success,
        result,
        privateKey
    }
}

Result.pageResult = function (nowPage, limit, totalNumber, result) {
    return {
        code: codeNumber.success,
        nowPage,
        totalPage: Math.ceil(totalNumber / limit),
        totalNumber,
        result
    }
}
module.exports = Result
