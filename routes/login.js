var express = require('express');
var router = express.Router();
//引入cors 解决跨域
const cors = require('cors');
const { exec,escape } = require('../db/mysql.js');
const jwt = require('jsonwebtoken');
const SECRET = require('../config/SECRET.js');//导入密钥



module.exports = router;