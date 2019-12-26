
const Router = require('koa-router');
const router = new Router();
const formidable = require('koa-formidable'); // 图片处理
const fs = require('fs'); // 图片路径
const path = require('path'); // 图片路径
var image = require("imageinfo"); //引用imageinfo模块


// 新建文件，可以去百度fs模块
let mkdirs = (dirname, callback) => {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
};

router.post('/saveImg', async function (ctx, next) {
    let form = formidable.parse(ctx.request);
    function formImage () {
        return new Promise((resolve, reject) => {
            form((opt, { fields, files }) => {
                let url = fields.url;
                let articleId = fields.articleId;
                let filename = files.file.name;
                let uploadDir = 'public/avatar/';
                let avatarName = Date.now() + '_' + filename;
                mkdirs('public/avatar', function () {
                    fs.renameSync(files.file.path, uploadDir + avatarName); //重命名
                    resolve(uploadDir + avatarName)
                })
            })
        })
    }
    await formImage().then(() => {
        ctx.body = { code: 0, msg: '上传成功', data: url } // 路径返回给前端
    }).catch((err) => {
        ctx.body = { code: 1, msg: '上传失败' } // 路径返回给前端
    })
});




function readFileList (path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {
            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }
    })
}
var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
        var imageList = [];
        this.getFileList(path).forEach((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));
            ms.mimeType && (imageList.push(item.filename))
        });
        return imageList;
    }
};
//获取文件夹下的所有图片
var srclist = getFiles.getImageFiles("./public/avatar/");
var srcNewList = [];
srclist.forEach(function (item, index) {
    if (item.split(".")[1] == 'jpg') {
        srcNewList.push({ 'imsrc': item })
    } else {
        srcNewList.push({ 'videosrc': item })
    }
})


router.post('/readImgUrl', async (ctx) => {
    ctx.body = { data: { code: 1, msg: '获取成功', imgurl: srcNewList } } // 路径返回给前端
})

module.exports = router