
const URL = 'http://localhost:3000/api'
export const apiURL = {
  BLOG: `${URL}/user/login`,
  BLOGLIST: `${URL}/writeblog/find`,
  BLOGPAGELIST: `${URL}/writeblog/pagelistfind`,
  DELETEBLOG: `${URL}/writeblog/Delete`,
  MODIFYBLOG: `${URL}/writeblog/update`,
  INSERTBLOG: `${URL}/writeblog/insert`,
  DELETETAG: `${URL}/tag/DeleteTag`,
  FINDTAG: `${URL}/tag/findTag`,
  ADDTAG: `${URL}/tag/insertag`,
  FINDCLASSIFY: `${URL}/classify/findClassify`,
  INSERTCLASSIFY: `${URL}/classify/insertclassify`,
  DELETECLASSIFY: `${URL}/classify/deleteclassify`,
  PERSONALINFO: `${URL}/writeblog/PerosnalInfo`,
  GETTOKEN: `${URL}/user/blogToken`,
  REGISTER: `${URL}/user/register`
}
