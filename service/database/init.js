
//初始化文件


const mongoose = require('mongoose')
const db = "mongodb://mongo/blog-db"
const glob = require('glob')
const { resolve } = require('path')
// glob：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件。
// resolve: 将一系列路径或路径段解析为绝对路径。



mongoose.Promise = global.Promise


// 一次性引入所有的Schema文件
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
    //连接数据库
    mongoose.set('useCreateIndex', true) //加上这个
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
        //把所有连接放到这里

        //增加数据库监听事件
        mongoose.connection.on('disconnected', () => {
            console.log('***********数据库断开***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }


        })

        mongoose.connection.on('error', err => {
            console.log('***********数据库错误***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }

        })
        //链接打开的时
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected successfully')
            resolve()
        })

    })
}