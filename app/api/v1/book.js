const Router = require('koa-router') // import koa-router model
const router = new Router()

router.get('/v1/book/latest', (ctx, next) => {
    ctx.body = { key: 'book' }
})

module.exports = router