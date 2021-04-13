const { exec,excape } = require('../db/mysql')

const loginCheck = (u , p)=>{
    u = excape(u);
    p = excape(p);
    const sql = `
     select uname,realname from user where uname ='${u}' and password = '${p}';
    `
    return exec(sql).then(rows=>{
        return rows[0] || {}
    })
}

module.exports = { loginCheck }