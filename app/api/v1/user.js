const bcrypt = require('bcryptjs')
const Router = require('koa-router') // import koa-router model

const {success} = require('../../lib/helper')
const {RegisterValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
const router = new Router({
    prefix:'/v1/user'
})

// registeration, insert(post), delete(delete), update(put), select(get)
router.post('/register', async(ctx, next)=>{
    const v = await new RegisterValidator().validate(ctx)
    
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    await User.create(user)
    success()
})

module.exports = router