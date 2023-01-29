
module.exports = {
    // prod
    environment:'dev',
    database:{
        dbName:'capstone',
        host:'192.168.64.2', // ip address of database
        port:3306,
        user:'root',
        password:'123456',
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'wxc9ce41c23a67ad33',
        appSecret:'5249b9daceef17b3331787dbd4da0402',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host:'http://localhost:3000/'
}