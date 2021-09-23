# Vercel示例方案

> [支持语言]: https://vercel.com/docs/functions/supported-languages
>
> 暂时只有四种，前端推荐next.js

![image-20210914133813296](/Users/lxp/Library/Application Support/typora-user-images/image-20210914133813296.png)

## 1 账号管理

### 1.1 创建账号

> https://vercel.com/login

### 1.2 创建团队（可选）

![image-20210914095527183](/Users/lxp/Library/Application Support/typora-user-images/image-20210914095527183.png)

## 2 项目部署

### 2.1 项目创建

#### 

![image-20210914095657580](/Users/lxp/Library/Application Support/typora-user-images/image-20210914095657580.png)

### 2.2 选择代码仓库（github，gitee，bitbucket）

![image-20210914095827863](/Users/lxp/Library/Application Support/typora-user-images/image-20210914095827863.png)

### 2.3 设置命令参数和环境变量

![image-20210914100115932](/Users/lxp/Library/Application Support/typora-user-images/image-20210914100115932.png)

### 2.4 完成部署

![image-20210914100151263](/Users/lxp/Library/Application Support/typora-user-images/image-20210914100151263.png)



## 3 控制面板

### 3.1 基础属性

![image-20210914100306033](/Users/lxp/Library/Application Support/typora-user-images/image-20210914100306033.png)

### 3.2 函数监控

![image-20210914100320553](/Users/lxp/Library/Application Support/typora-user-images/image-20210914100320553.png)



### 3.3 仓库跳转

![image-20210914100337654](/Users/lxp/Library/Application Support/typora-user-images/image-20210914100337654.png)

## 4 项目结构

### 4.1 基础目录（api文件夹下每个文件名称代表一个函数）

![image-20210914100452378](/Users/lxp/Library/Application Support/typora-user-images/image-20210914100452378.png)

### 4.2 api规范（必须采用module.exports方法导出）

![image-20210914100547646](/Users/lxp/Library/Application Support/typora-user-images/image-20210914100547646.png)

### 4.3 调用效果 (即url/api/文件名称)

![image-20210914100647652](/Users/lxp/Library/Application Support/typora-user-images/image-20210914100647652.png)



## 5 数据库技术选型

### 5.1 支持方案

![image-20210914101405441](/Users/lxp/Library/Application Support/typora-user-images/image-20210914101405441.png)



### 5.2 mysql  ([serverless-mysql](https://github.com/jeremydaly/serverless-mysql))

![image-20210914102123414](/Users/lxp/Library/Application Support/typora-user-images/image-20210914102123414.png)

#### 5.2.1 安装依赖

```
npm i serverless-mysql
```

#### 5.2.2 数据库配置

```js
const mysql = require('serverless-mysql')({
    config: {
        host: 'db4free.net',
        database: 'router_events',
        user: 'vercel',
        password: 'vercel123'
    }
})
```

#### 5.2.3 查询调用

```js
const data = await mysql.query('select * from NewGame')
```

#### 5.2.4 性能报告

![image-20210914102834650](/Users/lxp/Library/Application Support/typora-user-images/image-20210914102834650.png)

### 5.3 redis (

[Upstash]: https://vercel.com/integrations/upstash

### )

> [介绍文档]: https://docs.upstash.com/

![image-20210914102453473](/Users/lxp/Library/Application Support/typora-user-images/image-20210914102453473.png)



#### 5.3.1 添加进服务组

![image-20210914103249613](/Users/lxp/Library/Application Support/typora-user-images/image-20210914103249613.png)

#### 5.3.2 配置项目

![image-20210914103814298](/Users/lxp/Library/Application Support/typora-user-images/image-20210914103814298.png)

#### 5.3.3 控制面板

![image-20210914103844756](/Users/lxp/Library/Application Support/typora-user-images/image-20210914103844756.png)

#### 5.3.4 使用方式

##### 5.3.4.1 redis-client

![image-20210914104004184](/Users/lxp/Library/Application Support/typora-user-images/image-20210914104004184.png)

![image-20210914104028691](/Users/lxp/Library/Application Support/typora-user-images/image-20210914104028691.png)



##### 5.3.4.2 node.js

###### 5.3.4.2.1 配置环境变量（绑定Vercel项目时会自动生成）

![image-20210914105235462](/Users/lxp/Library/Application Support/typora-user-images/image-20210914105235462.png)

###### 5.3.4.2.2 安装依赖

> npm install ioredis

###### 5.3.4.2.3 redis配置

```js
const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);
```

###### 5.3.4.2.4 查询调用

```js
await redis.set('foo', 'bar')
const data = await redis.get("foo");
```

#### 5.3.5 售价方案

![image-20210914093158817](/Users/lxp/Library/Application Support/typora-user-images/image-20210914093158817.png)

### 5.4 mongodb (https://cloud.mongodb.com/v2/614037d403ef1a5b3a5a6ba4#clusters/pathSelector)

> [官方推荐]: https://docs.atlas.mongodb.com/best-practices-connecting-from-vercel/#std-label-vercel-example

![image-20210914135734044](/Users/lxp/Library/Application Support/typora-user-images/image-20210914135734044.png)

#### 5.4.1 mongodb配置

```js
"use strict";
// Import the dependency.
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
let client;
let clientPromise;
if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (hot module replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
}
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
module.exports = clientPromise;

```

#### 5.4.2 调用

```js
"use strict";
// Import the dependency.
const clientPromise = require('../config/mongodb');
// Handler
module.exports = async (req, res) => {
    const client = await clientPromise;
    res.status(200).json({dbName: client.db().databaseName});
}

```

#### 5.4.3 控制面板

![image-20210914143140688](/Users/lxp/Library/Application Support/typora-user-images/image-20210914143140688.png)