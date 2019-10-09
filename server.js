const jsonServer = require('json-server');
const server = jsonServer.create();
const permissionData = require('./permission');
const captcha = require('svg-captcha');
// const perRouter = jsonServer.router(permissionData);
const userArr = require('./user');
const routerUser = jsonServer.router({...{user:userArr}, ...permissionData});
const multer = require('multer');
const path = require('path');
const middlewares = jsonServer.defaults();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, 'public/server/upload')); // 文件存储的路径
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname); // 调整文件的保存地址
  }
});
const upload = multer({ storage: storage });
server.use(middlewares);
server.use(jsonServer.bodyParser);
// 所有的api的请求都要求登陆后才能获取到对应的数据
server.use('/per', (req, res, next) => {
  if (req.get('Authorization')) {
    next();
  } else {
    res.status(401).jsonp({
      code: 8,
      msg: '用户没有登录，不能访问'
    });
  }
});

// 用户登录校验
server.post('/api/userlogin', (req, res) => {
  let userName = req.body.username;
  let password = req.body.password;
  let loginUser = userArr.find((item) => item.username == userName && item.password == password);
  if(loginUser) {
    res.jsonp({
      user: loginUser,
      code: 1,
      msg: '授权成功',
      token: 'aicoder.com ' + Date.now()
    });
  } 
  else {
    res.jsonp({
      code: 0,
      msg: '用户名或者密码错误'
    });
  }
});

// 验证码
server.get('/api/code', (req,res)=>{
  const cap = captcha.create({
    color: true,
    size: 5,
    ignoreChars: '0oOi1gjdDl',
    noise: 1
  });
  // req.session.captcha = cap.text; // session 存储
  res.type('svg'); // 响应的类型
  res.send(cap.data);
});
// 文件上传
server.all('/per/upload', upload.single('imgF'), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  var file = req.file;
  console.log(file);

  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  res.json({ img: `/server/upload/${file.filename}` });
});

// 权限相关接口
// 获取用户的所有权限
server.use('/per/getUserPer/:id', (req, res) => {
  // 获得当前用户的特殊权限
  let userPerArr = permissionData.user_permission.filter(item => item.userId == req.params.id);
  let userPerIdArr = userPerArr.map(userPer => userPer.permissionId);
  // 获取用户的角色
  let userRoleArr = permissionData.user_role.filter(item => item.userId == req.params.id);
  // 获得所有角色的权限
  let rolePerIdArr = [];
  permissionData.role_permission.forEach( rolePer => {
    if(userRoleArr.find(userRole => userRole.roleId == rolePer.roleId)) {
      rolePerIdArr.push(rolePer.permissionId);
    }
  });
  
  let totalPerIdArr =[...new Set([...userPerIdArr, ...rolePerIdArr])];
  let result = [];
  
  // 把所有权限
  permissionData.permission.forEach(per => {
    if(totalPerIdArr.find(perId => per.id == perId && per.del == 0)) {
      result.push(per);
    }
  });
  res.json(result);
});

// server.use('/per', perRouter);
server.use('/per', routerUser);
server.listen(8888, () => {
  console.log('API Server is running, http://localhost:8888');
});