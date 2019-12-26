const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()


//查找全部
router.get('/find', async (ctx) => {
    try {
        const Writeblog = mongoose.model('writeblog')
        let result = await Writeblog.find({}).exec()
        ctx.body = { data: { list: result } }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})

//查找总数据
router.get('/PerosnalInfo', async (ctx) => {
    try {
        const Writeblog = mongoose.model('writeblog')
        var blognum = await Writeblog.find({}).count();
        ctx.body = [{ blognum: blognum }]
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})
//分页查找

router.post('/pagelistfind', async (ctx) => {

    try {
        let page = parseInt(ctx.request.body.page);
        let pageSize = parseInt(ctx.request.body.pageSize);
        const Writeblog = mongoose.model('writeblog')
        let result = await Writeblog.find().skip((page - 1) * pageSize).limit(pageSize)
        ctx.body = result
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})


router.post('/pagelistfindone', async (ctx) => {

    try {
        let ID = ctx.request.body.id
        const Writeblog = mongoose.model('writeblog')
        let result = await Writeblog.findOne({ _id: ID })
        ctx.body = { list: result }
    } catch (error) {
        ctx.body = { code: 500, message: error }
    }

})

//增加
router.post('/insert', async (ctx) => {
    const writeblog = mongoose.model('writeblog')
    let newWriteblog = new writeblog(ctx.request.body)
    await newWriteblog.save().then(() => {
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


//修改
router.post('/update', async (ctx) => {
    const writeblog = mongoose.model('writeblog')
    let updateBlogData = ctx.request.body
    updateBlogData.tagList = JSON.parse(updateBlogData.tagList)
    updateBlogData.selectedkind = JSON.parse(updateBlogData.selectedkind)
    await writeblog.updateOne({ _id: ctx.request.body._id }, updateBlogData).then(() => {
        ctx.body = {
            code: 200,
            message: '修改标签成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})



//删除
router.post('/Delete', async (ctx) => {
    const writeblog = mongoose.model('writeblog')
    await writeblog.deleteOne({ _id: ctx.request.body.id }).then(() => {

        ctx.body = {
            code: 200,
            message: '删除博客成功'
        }
    }).catch(error => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
})


module.exports = router;