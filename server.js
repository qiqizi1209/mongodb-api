require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// 中间件配置
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*' 
}));
app.use(express.json());

// 连接MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB连接错误:'));
db.once('open', () => {
  console.log('✅ 成功连接到本地MongoDB');
});

// 注册路由
app.use('/api', apiRoutes);

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).send('API运行正常');
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});