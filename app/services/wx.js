const util = require('util')
const axios = require('axios')

const {User} = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManager {

    static async codeToToken(code) {
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)

        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('Failed to obtain openid')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if (errcode){
            throw new global.errs.AuthFailed('Failed to obtain openid:'+errmsg)
        }
        // openid
        // record user uid openid (openid is too long, it is not good for primary key)
        // openid 

        let user = await User.getUserByOpenid(result.data.openid)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }

}

module.exports = {
    WXManager
}