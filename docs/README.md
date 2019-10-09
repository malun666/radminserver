# 后台权限管理服务接口系统 --aicoder.com

此系统为aicoder.com内部使用的，权限管理后台数据接口服务器系统。

接口文档地址：https://malun666.github.io/radminserver/#/

github仓库地址：[https://github.com/malun666/radminserver](https://github.com/malun666/radminserver)

> 内部文档禁止分享

## 综述

只有登录相关的接口不需要添加认证的token,其余所有的接口请求都必须在请求头中添加 `Authorization`.

所有的请求对应模型都默认提供了: 添加、修改、查询、复杂查询和删除操作的api。

### 接口统一地址模型

接口地址符合`RestFul`风格。

+ 添加

| 标题  | 说明               | 备注                                        |
|-----|------------------|-------------------------------------------|
| 地址  | `POST /api/模型名字` | `header`中必须添加 `Authrization`对应的jwt的token. |

例如:

```js
$.ajax({
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3002/api/user",
  "method": "POST",
  "headers": {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzcxODU3OTk5NzgsIm5hbWUiOiJzZGZmZmYifQ.WLVdU-GESQR6kJfUdLCBpNWUZMGAW6VsTk6lfAXC1xM"
  },
  "data": {
    "Name": "laomsds",
    "Passwd": "aaafc44445555",
    "isDel": "false"
  }
}).done(function (response) {
  console.log(response);
});
```

+ 修改

| 标题  | 说明                  | 备注                                        |
|-----|---------------------|-------------------------------------------|
| 地址  | `PUT /api/模型名字/:id` | `header`中必须添加 `Authrization`对应的jwt的token. |
支持`PATCH协议`

```js
$.ajax({
  "async": true,
  "crossDomain": true,
  "url": "http://%E4%BF%AE%E6%94%B9",
  "method": "PUT",
  "headers": {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzcxODU3OTk5NzgsIm5hbWUiOiJzZGZmZmYifQ.WLVdU-GESQR6kJfUdLCBpNWUZMGAW6VsTk6lfAXC1xM",
    "Content-Type": "application/json"
  },
  "data": {
    "Name": "laoma2333"
  }
}).done(function (response) {
  console.log(response);
});
```

+ 删除

| 标题  | 说明                     | 备注                                        |
|-----|------------------------|-------------------------------------------|
| 地址  | `DELETE /api/模型名字/:id` | `header`中必须添加 `Authrization`对应的jwt的token. |

```js
$.ajax({
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3002/api/user/5b9621e7cad9bf1c60e1d51f",
  "method": "DELETE",
  "headers": {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzcxODU3OTk5NzgsIm5hbWUiOiJzZGZmZmYifQ.WLVdU-GESQR6kJfUdLCBpNWUZMGAW6VsTk6lfAXC1xM"
  }
}).done(function (response) {
  console.log(response);
});
```

+ 查询id

| 标题  | 说明                  | 备注                                        |
|-----|---------------------|-------------------------------------------|
| 地址  | `GET /api/模型名字/:id` | `header`中必须添加 `Authrization`对应的jwt的token. |

```js
$.ajax({
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3002/api/user/5b9621e7cad9bf1c60e1d51f",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzcxODU3OTk5NzgsIm5hbWUiOiJzZGZmZmYifQ.WLVdU-GESQR6kJfUdLCBpNWUZMGAW6VsTk6lfAXC1xM"
  }
}).done(function (response) {
  console.log(response);
});
```

### 复合查询

| 标题     | 说明                                                                                             |
|--------|------------------------------------------------------------------------------------------------|
| 地址     | `GET /api/模型名字`                                                                                |
| 注意事项   | `header`中必须添加 `Authrization`对应的jwt的token.                                                      |
| 分页     | 当前页请求参数中,添加 `page`, 默认不分页.一页大小,请在请求参数中添加`limit`或`pageSize`. 例如:   `page=9&limit=10`,一页10条,第9页. |
| 排序     | 升序: `sort_asc=排序字段名`, 降序:`sort_desc=排序字段名`                                                     |
| 等于过滤   | `字段名_eq=等于的值`, 查询某个字段必须等于什么...                                                                 |
| 模糊查询过滤 | `字段名_like=模糊查询的值`                                                                              |

```js
$.ajax({
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3002/api/user?sort_asc=Passwd&limit=5&page=1",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzcxODU3OTk5NzgsIm5hbWUiOiJzZGZmZmYifQ.WLVdU-GESQR6kJfUdLCBpNWUZMGAW6VsTk6lfAXC1xM"
  }
}).done(function (response) {
  console.log(response);
});
```

## 验证码地址

地址：http://localhost:8888/api/code

后台返回 svg的内容。

前端使用：

```html
<embed src="http://localhost:8888/api/code" type="image/svg+xml" />
或者图片
<img src="http://localhost:8888/api/code" alt="Breaking Borders Logo" height="65" width="68">
```

## 文件上传

文件上传限制文件大小： 2M，目前只支持上传一张图片。

上传地址： `http://localhost:8888/per/upload`

请求参数：

```sh
请求表单中，文件对应的name必须为： imgF
```

上传图片后，返回内容：

```js
{ img: `图片地址` }
// 例如：
{ img: '/server/upload/a.png'}
```

> 后台图片存放在localhost服务器上。

## 登陆相关

### 登陆获取token

用户登录WebApp时，首先对用户进行鉴权。

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/api/userlogin` |
| 请求方式 | `POST`                                               |
| 数据类型 | `application/json`                                   |
| 特殊要求 | 后台限制同一指纹浏览器,在1分钟内只能请求5次,超过次数认为是攻击,则禁止登录.             |

#### 请求参数

| 序号  | 字段     | 类型     | 性质  | 说明   |
|-----|--------|--------|-----|------|
| 1   | username    | String | 必填  | 公司编号 |
| 2   | password | String | 必填  | 密 码   |
| 3   | code | String | 必填  | 验证码   |

#### 返回值

| 序号  | 字段    | 类型     | 说明                |
|-----|-------|--------|-------------------|
| 1   | user  | Object | 登陆成功的用户对象信息       |
| 2   | code  | Number | 登陆成功的编码，1成功， 0失败。 |
| 3   | token | String | token密钥。          |
| 4   | msg   | String | 消息内容。             |

> 登录成功后续请求都需要添加token密钥到header的Authorization中。

用户对象类型

| 属性            | 类型       | 参考值                      | 说明     |
|---------------|----------|--------------------------|--------|
| del         | Boolean  | false                    | 是否删除   |
| id           | Number | 1 | 主键     |
| username          | String   | vyk                      | 用户名    |
| passwd        | String   | 123123                   | 密码     |
| avatar        | String   | /a/b.png                 | 头像     |
| name         | String   | 郑霞                       | 中文名    |
| phone         | String   | 1555511215151            | 电话     |
| mail | Date     | lsf@mm.com               | 邮箱 |
| school    | String | 北京大学 | 学校   |
| isTeacher    | Boolean | true | 是否是老师   |

#### 返回实例

```js
// 登录成功消息
{
    "user": {
      id: 1000,
      username: 'wyd',
      password: 'aicoder.com',
      del: false,
      active: true, //  激活
      avatar: '/img/a1.png',
      name: "张三",
      school: '清华大学',
      mail: Random.email(),
      phone: '189222222',
      isTeacher: true
    },
    "code": 1,
    "msg": "登录成功",
    "token": "eyJ0eXAiOiJKV1..."
}

// 登录失败消息
{
  code: 0,
  msg: '用户名或者密码错误'
}
```

当前可以用的用户名密码：

用户名|密码|是否是老师
---|---|---
aicoder1|aicoder.com|否
aicoder2|aicoder.com|是
admin|aicoder.com|是
admin1|aicoder.com|是
18911112222|aicoder.com|是
18911113333|aicoder.com|是
18911114444|aicoder.com|是

## 用户操作接口

### 获取用户

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/user` |
| 请求方式 | `GET`                                               |
| 数据类型 | `application/json`                                   |
| 特殊要求 | 后台限制同一指纹浏览器,在1分钟内只能请求5次,超过次数认为是攻击,则禁止登录.             |

#### 请求用户的参数

| 序号  | 字段     | 类型     | 性质  | 说明   |
|-----|--------|--------|-----|------|
| 1   | id    | String | 必填  | 用户的ID |

#### ——返回值

返回一个数组，数组里面的对象是查询的当前用户的信息。

| 序号  | 字段    | 类型     | 说明                |
|-----|-------|--------|-------------------|
| 1   | id  | Number | 用户ID       |
| 2   | del  | Boolean | 是否删除 |
| 3   | username | String | 用户名          |
| 4   | password   | String | 密码             |
| 5   | avatar   | String | 头像             |
| 6   | name   | String | 姓名             |
| 7   | mail   | String | 邮箱             |
| 8   | phone   | String | 电话             |
| 9   | isTeacher   | Boolean | 是否老师             |

例如：

```js
[
    {
        "id": 1000,
        "username": "wyd",
        "password": "aicoder.com",
        "del": false,
        "active": true,
        "avatar": "http://localhost:8888/server/img/a1.png",
        "name": "张三",
        "school": "清华大学",
        "mail": "y.ajomofyh@hdeju.tj",
        "phone": "189222222",
        "isTeacher": true
    }
]
```

### 添加用户

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/user` |
| 请求方式 | `POST`                                               |
| 数据类型 | `application/json`                                   |
| 特殊要求 | 后台限制同一指纹浏览器,在1分钟内只能请求5次,超过次数认为是攻击,则禁止登录.             |

参考json-server的添加

### 修改用户

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/user/{id}` |
| 请求方式 | `PUT`                                               |
| 数据类型 | `application/json`                                   |
| 特殊要求 | 后台限制同一指纹浏览器,在1分钟内只能请求5次,超过次数认为是攻击,则禁止登录.             |

参考json-server的添加

### 删除用户

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/user/{id}` |
| 请求方式 | `DELETE`                                               |
| 数据类型 | `application/json`                                   |
| 特殊要求 | 后台限制同一指纹浏览器,在1分钟内只能请求5次,超过次数认为是攻击,则禁止登录.             |

参考json-server的添加

## 权限相关

### 获取用户的所有权限

请求地址： http://localhost:8888/per/getUserPer/1003

获取用户的所有权限

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/getUserPer/:id` |
| 请求方式 | `GET`                                               |
| 数据类型 | `application/json`                                   |

#### 请求参数

无

#### 返回值

后台返回一个数组，数组里面内容是用户的所有权限数据。

```js
[{权限1},{权限2}]
```

#### 返回实例

```js
[
    {
        "id": 1004,
        "pId": 0,
        "type": "menu",
        "des": "矿生音",
        "status": 0,
        "del": 0,
        "subon": "2019-05-08 17:07:16",
        "subby": 1001,
        "code": 10004,
        "url": "",
        "order": 1
    },
    {
        "id": 1014,
        "pId": 0,
        "type": "menu",
        "des": "即政或",
        "status": 0,
        "del": 0,
        "subon": "2019-05-08 17:07:16",
        "subby": 1001,
        "code": 10014,
        "url": "",
        "order": 2
    }
]
```

### 添加权限接口

请求地址： `http://localhost:8888/per/permission`

添加权限接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/permission` |
| 请求方式 | `POST`                                               |
| 数据类型 | `application/json`                                   |

#### 请求参数

| 序号  | 字段    | 类型     | 说明                |
|-----|-------|--------|-------------------|
| 1   | id  | Number | 权限ID       |
| 2   | del  | Number | 1删除， 0 未删除 |
| 3   | type | String | 权限类型： `menu`, `route` ,`resource`, `data`,`component`, `file`|
| 4   | des   | String | 权限描述             |
| 5   | status   | Number   | 权限状态，0启用， 1禁用             |
| 6   | subon   | String | 提交时间             |
| 7   | subby   | Number | 提交人             |
| 8   | code   | String | 权限码             |
| 9   | url   | String | 权限地址             |
| 10   | pId  | Number | 权限父ID       |
| 11   | order  | Number |排序       |

#### 返回值

后台返回添加当前权限对象。

> 权限其他修改、删除、搜索查询等同`json-server`的`api`

### 删除权限接口

删除权限接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/permission/:id` |
| 请求方式 | `DELETE`                                               |
| 数据类型 | `application/json`                                   |

#### 请求参数

无

#### 返回值

返回删除当前权限的对象

#### 返回实例

```js
{
    "id": 1000,
    pId: 0,
    type: 'menu',
    des: '用户管理',
    status: 0,
    del: 0,
    subon: '2019-05-08 17:07:16',
    subby: 1001,
    "code": 10000,
    url: '/user'
}
```

### 权限多条件查询接口

权限多条件接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/permission/` |
| 请求方式 | `GET`                                               |
| 数据类型 | `application/json`                                   |

+ 查询单个权限（id）

    `GET 请求： http://localhost:8888/per/permission/1000`

+ 分页+排序查询权限

    `GET 请求： http://localhost:8888/per/permission?_page=1&_limit=10&_sort=id`

+ 分页+排序+like查询权限

    `GET 请求： http://localhost:8888/per/permission?_page=1&_limit=10&_sort=id&des_like=用`

> 分页数据：json-server默认通过响应头返回满足条件的总条数（响应头为：x-total-count)

#### 请求参数

无

#### 返回值

返回权限的对象数组

`[{权限对象1}, {权限对象1}]`

#### 返回实例

```js
[{
    "id": 1000,
    pId: 0,
    type: 'menu',
    des: '用户管理',
    status: 0,
    del: 0,
    subon: '2019-05-08 17:07:16',
    subby: 1001,
    "code": 10000,
    url: '/user'
    },
    ...
]
```

## 角色接口相关

请求地址： `http://localhost:8888/per/role`

### 添加角色

添加角色接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/role` |
| 请求方式 | `POST`                                               |
| 数据类型 | `application/json`                                   |

#### 角色请求参数

| 序号  | 字段    | 类型     | 说明                |
|-----|-------|--------|-------------------|
| 1   | id  | Number | 权限ID       |
| 2   | del  | Number | 1删除， 0 未删除 |
| 3   | des   | String | 角色描述             |
| 4   | status   | Number   | 权限状态，0启用， 1禁用             |
| 5   | subon   | String | 提交时间             |
| 6   | pId  | Number | 父角色ID       |
| 7   | name  | String | 角色名字       |

#### 返回值

后台返回添加当前角色对象。

#### 返回实例

```js
{
    id: 5,
    pid: 0,
    name: '超级管理员',
    des: '超级管理员',
    subon: '2019-05-08 16:54:26',
    status: 0,
    del: 0
  }
```

> 角色其他修改、删除、搜索查询等同`json-server`的`api`

### 删除角色

删除角色接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/role/:id` |
| 请求方式 | `DELETE`                                               |
| 数据类型 | `application/json`                                   |

>例如： DELETE 请求 http://localhost:8888/per/role/9000

#### 请求参数

无

#### 返回值

后台返回当前删除角色对象。

#### 返回实例

```js
{
    id: 5,
    pid: 0,
    name: '超级管理员',
    des: '超级管理员',
    subon: '2019-05-08 16:54:26',
    status: 0,
    del: 0
  }
```

### 修改角色

修改角色接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/role/:id` |
| 请求方式 | `PUT`                                               |
| 数据类型 | `application/json`                                   |

#### 请求参数

请求地址：

  `http://localhost:8888/per/role/1992`

> 要在请求地址结尾处添加当前修改元素的id

请求body：

| 序号  | 字段    | 类型     | 说明                |
|-----|-------|--------|-------------------|
| 1   | id  | Number | 权限ID       |
| 2   | del  | Number | 1删除， 0 未删除 |
| 3   | des   | String | 角色描述             |
| 4   | status   | Number   | 权限状态，0启用， 1禁用             |
| 5   | subon   | String | 提交时间             |
| 6  | pId  | Number | 父角色ID       |
| 7   | name  | String | 角色名字       |

#### 返回值

后台返回当前修改角色对象。

#### 返回实例

```js
{
    id: 5,
    pid: 0,
    name: '超级管理员',
    des: '超级管理员',
    subon: '2019-05-08 16:54:26',
    status: 0,
    del: 0
  }
```

> 角色其他修改、删除、搜索查询等同`json-server`的`api`

## 角色关联权限相关接口

地址： `http://localhost:8888/per/role_permission`

### 添加角色关联权限

添加角色关联接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/role_permission` |
| 请求方式 | `POST`                                               |
| 数据类型 | `application/json`                                   |

#### 请求参数

请求body：

| 序号  | 字段    | 类型     | 说明                |
|-----|-------|--------|-------------------|
| 1   | id  | Number | 权限ID       |
| 2   | del  | Number | 1删除， 0 未删除 |
| 3   | subon   | String | 提交时间             |
| 4   | roleId  | Number | 角色ID       |
| 5   | permissionId  | Number | 权限ID       |

#### 返回值

后台返回当前添加的角色权限关联对象。

#### 返回实例

```js
{
  "id": 1000,
  roleId: 222,
  "permissionId": 1002,
  del: 0,
  subOn: '2019-06-10 09:49:23'
}
```

> 分页、删除、修改都同 JSON-Server

## 用户角色接口

地址： `http://localhost:8888/per/user_role`

### 添加用户角色关联

添加用户角色关联接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/user_role` |
| 请求方式 | `POST`                                               |
| 数据类型 | `application/json`                                   |

#### 请求参数

请求body：

| 序号  | 字段    | 类型     | 说明                |
|-----|-------|--------|-------------------|
| 1   | id  | Number | 权限ID       |
| 2   | del  | Number | 1删除， 0 未删除 |
| 3   | subon   | String | 提交时间             |
| 4   | roleId  | Number | 角色ID       |
| 5   | userId  | Number | 用户ID       |

#### 返回值

后台返回当前添加的用户角色关联对象。

#### 返回实例

```js
{
  id: 1,
  userId: 1003,
  roleId: 1,
  del: 0,
  subon: '2019-05-08 16:57:50'
}
```

> 分页、删除、修改都同 JSON-Server

## 用户权限接口

地址： `http://localhost:8888/per/user_permission`

### 添加用户角色关联

添加用户权限关联接口

| 类型   | 说明                                                   |
|------|------------------------------------------------------|
| 接口地址 | `http://localhost:8888/per/user_permission` |
| 请求方式 | `POST`                                               |
| 数据类型 | `application/json`                                   |

#### 请求参数

请求body：

| 序号  | 字段    | 类型     | 说明                |
|-----|-------|--------|-------------------|
| 1   | id  | Number | 权限ID       |
| 2   | del  | Number | 1删除， 0 未删除 |
| 3   | subon   | String | 提交时间             |
| 4   | permissionId  | Number | 权限ID       |
| 5   | userId  | Number | 用户ID       |

#### 返回值

后台返回当前添加的用户权限关联对象。

#### 返回实例

```js
{
  id: 1,
  userId: 1002,
  permissionId: 1003,
  del: 0,
  subOn: '2019-06-10 09:48:01'
}
```

> 分页、删除、修改都同 JSON-Server

## 轮播图接口

#### 轮播图接口请求参数

无

> 需要添加token密钥到header的Authorization中。

#### 轮播图接口返回值

后台返回一个数组，数组里面内容是轮播图的数据。

```js
[{轮播图数据}]
```

| 属性            | 类型       | 参考值                      | 说明     |
|---------------|----------|--------------------------|--------|
| order           | Number | 1 | 排序     |
| title          | String   |     美丽景色                  | 轮播图标题    |
| imgUrl        | String   | /a/b.png                 | 图片地址     |
| url         | String   | /home/a.html                       | 跳转地址    |

#### 轮播图接口返回实例

```js
// 获取成功返回的内容
[
    {
        "order": 1,
        "title": "美丽景色",
        "imgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555293675&di=a807c0f74255accb5380165976293a84&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01398c5942618ca8012193a3f97976.jpg",
        "url": "http://www.aicoder.com"
    },
    {
        "order": 2,
        "title": "美丽景色1",
        "imgUrl": "http://www.33lc.com/article/UploadPic/2012-10/2012101714102663437.jpg",
        "url": "/login.html"
    },
    {
        "order": 3,
        "title": "美丽景色2",
        "imgUrl": "http://www.33lc.com/article/UploadPic/2012-10/2012101714103954400.jpg",
        "url": "/"
    }
]

// 未登录，返回失败消息，状态码是401
{
  code: 8,
  msg: '用户没有登录，不能访问'
}
```
