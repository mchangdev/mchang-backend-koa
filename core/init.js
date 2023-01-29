const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager{
    // Entry Method
    static initCore(app){
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()
    }

    static loadConfig(path = ''){
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath) // expory module
        global.config = config
    }

    static initLoadRouters(){
        // path config, 'process' is global, function cwe() can get absolute path which is root directory
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })
        
        function whenLoadModule(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes()) // Registration
            }
        }
    }

    static loadHttpException(){
        const errors = require('./http-exception')
        global.errs = errors
    }
}

module.exports = InitManager