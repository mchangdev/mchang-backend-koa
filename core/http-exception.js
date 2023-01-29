
class HttpException extends Error{
    constructor(msg = 'Exception from Server', errorCode=10000, code=400){
        super() // Call the constructor of the base class
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode){
        super()
        this.code = 400
        this.msg = msg || 'parameter mistake'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException{
    constructor(msg, errorCode){
        super()
        this.code = 201
        this.msg = msg || 'OK!!'
        this.errorCode = errorCode || 0
    }
}

class NotFound extends HttpException{
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'resource not found'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}

class AuthFailed  extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'Authorization failed'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

class Forbbiden extends HttpException{
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'No Access'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

class LikeError extends HttpException {
    constructor(msg, error_code) {
        super()
        this.code = 400
        this.msg = "you have liked"
        this.error_code = 60001
    }
}

class DislikeError extends HttpException {
    constructor(msg, error_code) {
        super()
        this.code = 400
        this.msg = "You have unliked"
        this.error_code = 60002
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DislikeError
}