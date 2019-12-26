
//用户管理

const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()



//用户注册
router.post('/register', async (ctx) => {
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})



//用户登录
router.post('/login', async (ctx) => {
    let { username, password } = ctx.request.body
    //取得Model
    const User = mongoose.model('User')
    let data = await User.find().exec()
    await User.findOne({ username: username }).exec().then(async (result) => {
        if (result) {
            let newUser = new User()
            await newUser.comparePassword(password, result.password)
                .then(isMatch => {
                    ctx.body = { code: 200, message: isMatch, codeState: 0 }
                })
                .catch(error => {
                    ctx.body = { code: 500, message: error, codeState: 2 }
                })
        } else {
            ctx.body = { code: 200, message: '用户名不存在', codeState: 1 }
        }
    }).catch(error => {
        ctx.body = { code: 500, message: error, codeState: 3 }
    })
})

module.exports = router;

