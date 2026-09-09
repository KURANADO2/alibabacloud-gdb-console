# 阶段一：构建前端静态页面
# 产物是一堆与指令集无关的静态文件，所以这一步在任何架构上跑都一样
FROM node:22-bookworm-slim AS webbuild

WORKDIR /app

# 国内服务器加速用；若在境外构建，覆盖成 https://registry.npmjs.org 即可
ARG NPM_REGISTRY=https://registry.npmmirror.com

# 先只拷依赖清单，让这一层能被缓存复用，改业务代码时不必重装依赖
COPY .npmrc package.json package-lock.json ./
RUN npm ci --registry=$NPM_REGISTRY

COPY public ./public
COPY src ./src

# 前端构建比较吃内存，服务器内存紧张时下调这个值
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build


# 阶段二：运行期
# 后端同时提供接口和前端静态页面，所以只需要一个进程、一个端口
FROM node:22-bookworm-slim

WORKDIR /app

ARG NPM_REGISTRY=https://registry.npmmirror.com

ENV NODE_ENV=production

# 同样先装依赖再拷代码，保证缓存命中
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm ci --omit=dev --prefix backend --registry=$NPM_REGISTRY

# .dockerignore 已排除宿主机上的 backend/node_modules，
# 这里覆盖代码目录不会冲掉上一步装好的依赖
COPY backend ./backend
COPY --from=webbuild /app/build ./build

EXPOSE 3000

ENTRYPOINT ["node", "backend/bin/www"]
