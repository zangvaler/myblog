const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型



//创建我们的用户Schema
const classifySchema = new Schema({
    classifyname: { unique: true, type: String },
    color: String,
    backgroundColor: String,
    createAt: { type: Date, default: Date.now() }

}, {
    collection: 'classify'
})

//发布模型
mongoose.model('classify', classifySchema)