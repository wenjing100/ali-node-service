// const blogRouterHandler = require("../router/blog")
const { exec,excape } = require('../db/mysql')
const xss = require('xss')
const genPassword = require('../utils/crypto')

const getList = (author,keyword)=>{
    let sql = `select id as 序号, title as 标题, content as 内容 ,createtime as 创建时间,author as 作者 from blog where 1=1 `

    author = excape(author);
    keyword = excape(keyword);
    if (author){
        sql += `and author = '${author}' `
    }
    if (keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id)=>{
    id = excape(id)
    const sql = `select * from blog where id = ${id}`
    return exec(sql)
}
const newBlog = (blogDate = {})=>{
    //blogDate是一个对象 包含 title content author属性
    const title = safer(blogDate.title);
    const content = safer(blogDate.content);
    const author = safer(blogDate.author);
    const createtime = Date.now()
    const sql = `insert into blog(title,content,author,createtime) 
    values('${title}','${content}','${author}',${createtime});`
    return exec(sql).then(insertInfo=>{
        return{
            id:insertInfo.insertId
        }
    })
}
const updateBlog = (id,updateDate = {})=>{
    //updateDate 是一个对象 包含 id title content 等属性
    id = excape(id);
    const title = safer(updateDate.title);
    const content = safer(updateDate.content);
    const sql = `update blog set title="${title}",content="${content}" where id=${id};`
    return exec(sql).then(data=>{
        if(data.affectedRows>0){
            return true
        }
        return false
    })
}

const delBlog = (id,author)=>{
    id = excape(id);
    author = excape(author);
    const sql = `delete from blog where id = ${id} and author ='${author}';`
    return exec(sql).then(data=>{
        if(data.affectedRows>0){
            return true
        }
        return false
    })
}
function safer(content){
    content = xss(content);
    content = excape(content);
    return content
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}