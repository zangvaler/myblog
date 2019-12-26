import qs from 'qs'
import fly from 'flyio'
import { apiURL, upUrl } from './api.cfg'


//登录
export const Login = (params) => fly.post(`${apiURL.BLOG}`, qs.stringify(params))
// 博客列表
export const getbloglist = () => fly.get(`${apiURL.BLOGLIST}`)
// 上传页数
export const blog = (params) => fly.post(`${apiURL.BLOGPAGELIST}`, qs.stringify(params))
// 删除博客
export const Deleteblog = (params) => fly.post(`${apiURL.DELETEBLOG}`, qs.stringify(params))
// 修改博客
export const modifyblog = (params) => fly.post(`${apiURL.MODIFYBLOG}`, qs.stringify(params))
// 增加博客
export const insertblog = (params) => fly.post(`${apiURL.INSERTBLOG}`, qs.stringify(params))
// 删除标签
export const Deletetag = (params) => fly.post(`${apiURL.DELETETAG}`, qs.stringify(params))
// 标签列表
export const fingtag = () => fly.get(`${apiURL.FINDTAG}`)
// 添加标签
export const addtag = (params) => fly.post(`${apiURL.ADDTAG}`, qs.stringify(params))
// 删除分类
export const Deleteclassify = (params) => fly.post(`${apiURL.DELETECLASSIFY}`, qs.stringify(params))
// 分类列表
export const classifyList = () => fly.get(`${apiURL.FINDCLASSIFY}`)
// 添加分类
export const addclassify = (params) => fly.post(`${apiURL.INSERTCLASSIFY}`, qs.stringify(params))
// 获取token
export const gettoken = () => fly.get(`${apiURL.GETTOKEN}`)
// 获取个人信息
export const getPersonalInfo = () => fly.get(`${apiURL.PERSONALINFO}`)
// 注册账号
export const RegisterHandle = (params) => fly.post(`${apiURL.REGISTER}`, qs.stringify(params))