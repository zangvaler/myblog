const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const SALT_WORK_FACTOR = 10



//创建我们的用户Schema
const tagSchema = new Schema({
    tagname: { unique: true, type: String },
    color: String,
    backgroundColor: String,
    createAt: { type: Date, default: Date.now() }

}, {
    collection: 'tag'
})

//发布模型
mongoose.model('Tag', tagSchema)