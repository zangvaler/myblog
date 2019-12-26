
//入口文件


const Koa = require('koa')
const app = new Koa()
//引入connect
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const serve = require("koa-static");


app.use(cors())
app.use(bodyParser());
app.use(serve(__dirname))  // 设置静态文件


let user = require('./appApi/User.js')
let tag = require('./appApi/Tag.js')
let classify = require('./appApi/Classify.js')
let writeblog = require('./appApi/Writeblog.js')
let uploadImg = require('./appApi/uploadImg.js')

let router = new Router();
router.use('/api/user', user.routes())
router.use('/api/tag', tag.routes())
router.use('/api/classify', classify.routes())
router.use('/api/writeblog', writeblog.routes())
router.use('/api/uploadImg', uploadImg.routes())

app.use(router.routes())
app.use(router.allowedMethods())




    //立即执行函数
    ; (async () => {
        await connect()
        initSchemas()
    })()




app.listen(3000, () => {
    console.log('[Server] starting at port 3000')
})