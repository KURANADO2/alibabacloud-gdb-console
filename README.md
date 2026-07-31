# GDB 可视化控制台

## 运行

运行环境：Node.js 20 或更高版本、npm 10 或更高版本。

安装依赖：

```bash
npm install
npm install --prefix backend
```

开发模式需要分别启动后端和前端：

```bash
# 终端 1：后端监听 3030 端口
PORT=3030 npm run server

# 终端 2：前端监听 3000 端口
npm start
```

浏览器打开 `http://localhost:3000`。

生产模式由后端同时提供 API 和前端静态文件：

```bash
npm run build
NODE_ENV=production PORT=3000 npm run server
```

浏览器打开 `http://localhost:3000`。
