const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()


//查找
router.get('/findClassify', async (ctx) => {
    try {
        const classify = mongoose.model('classify')
        let result = await classify.find({}).exec()
        ctx.body = result
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})


//增加
router.post('/insertclassify', async (ctx) => {
    const classify = mongoose.model('classify')
    let newclassify = new classify(ctx.request.body)

    await newclassify.save().then(() => {

        ctx.body = {
            code: 200,
            message: '添加分类成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

//删除
router.post('/deleteclassify', async (ctx) => {
    const classify = mongoose.model('classify')
    await classify.deleteOne({ _id: ctx.request.body.id }).then(() => {

        ctx.body = {
            code: 200,
            message: '删除分类成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})


module.exports = router;