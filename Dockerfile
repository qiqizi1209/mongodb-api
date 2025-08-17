# 使用官方Node镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 先复制依赖文件（利用Docker缓存层）
COPY package*.json ./

# 安装生产依赖
RUN npm install --production

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000


# 启动命令
CMD ["node", "server.js"]