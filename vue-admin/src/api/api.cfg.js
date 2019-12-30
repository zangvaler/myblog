const SERVER = 'http://118.190.104.43:3000/api'

export const statusCode = {
    OK: 200
}

export const apiURL = {
    BLOG: `${SERVER}/user/login`,
    BLOGLIST: `${SERVER}/writeblog/find`,
    BLOGPAGELIST: `${SERVER}/writeblog/pagelistfind`,
    DELETEBLOG: `${SERVER}/writeblog/Delete`,
    MODIFYBLOG: `${SERVER}/writeblog/update`,
    INSERTBLOG: `${SERVER}/writeblog/insert`,
    DELETETAG: `${SERVER}/tag/DeleteTag`,
    FINDTAG: `${SERVER}/tag/findTag`,
    ADDTAG: `${SERVER}/tag/insertag`,
    FINDCLASSIFY: `${SERVER}/classify/findClassify`,
    INSERTCLASSIFY: `${SERVER}/classify/insertclassify`,
    DELETECLASSIFY: `${SERVER}/classify/deleteclassify`,
    PERSONALINFO: `${SERVER}/writeblog/PerosnalInfo`,
    GETTOKEN: `${SERVER}/user/blogToken`,
    REGISTER: `${SERVER}/user/register`
}


export const upUrl = {
    urlImg :"http://118.190.104.43:3000/api/uploadImg/saveImg"
}