const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()


//查找
router.get('/findTag', async (ctx) => {
    try {
        const Tag = mongoose.model('Tag')
        let result = await Tag.find({}).exec()
        ctx.body = result
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})


//增加
router.post('/insertag', async (ctx) => {
    const Tag = mongoose.model('Tag')
    let newTag = new Tag(ctx.request.body)

    await newTag.save().then(() => {
        saveCount++
        ctx.body = {
            code: 200,
            message: '添加标签成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})

//删除
router.post('/DeleteTag', async (ctx) => {
    const Tag = mongoose.model('Tag')
    await Tag.deleteOne({ _id: ctx.request.body.tagid }).then(() => {

        ctx.body = {
            code: 200,
            message: '删除标签成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})


module.exports = router;