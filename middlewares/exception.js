const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        //dev environment or prod environment
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        
        if(isDev && !isHttpException){
            throw error // Once an exception is thrown, subsequent code does not execute
        }

        if(isHttpException){
            ctx.body = {
                msg : error.msg,
                error_code : error.errorCode,
                request : `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }else{
            ctx.body = {
                msg: 'server side has a mistake!',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError