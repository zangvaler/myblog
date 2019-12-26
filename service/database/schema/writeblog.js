
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const SALT_WORK_FACTOR = 10


const writeblogSchema = new Schema({
    blogId: ObjectId,
    publishTime: { type: Date, default: Date.now() },
    watchnum: String,
    blogtitle: { unique: true, type: String },
    tagList: Array,
    selectedkind: Array,
    briefcontent: String,
    blogcontent: String,
    markdowncontent: String,
    catalog: String

}, {
    collection: 'writeblog'
})



//发布模型
mongoose.model('writeblog', writeblogSchema)