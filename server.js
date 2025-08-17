require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

// MongoDB 连接
const client = new MongoClient(process.env.MONGODB_URI);
let db;

console.log(process.env.MONGODB_URI)
console.log(process.env.DB_NAME)

async function connectDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log("Connected to MongoDB");
}
connectDB();

// API路由：获取所有宠物
app.get('/api/pets', async (req, res) => {
  try {
    const pets = await db.collection('pets').find({}).toArray();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// 在已有代码后添加以下路由（放在 app.get 之后，app.listen 之前）

// API路由：添加新宠物
app.post('/api/pets', express.json(), async (req, res) => {
  try {
    // 1. 验证输入数据
    if (!req.body.name || !req.body.species) {
      return res.status(400).json({ 
        error: "必须提供 name 和 species 字段" 
      });
    }

    // 2. 准备要插入的数据
    const newPet = {
      name: req.body.name,
      species: req.body.species,
      age: req.body.age || null,       // 可选字段
      createdAt: new Date()           // 自动添加时间戳
    };

    // 3. 插入数据库
    const result = await db.collection('pets').insertOne(newPet);
    
    // 4. 返回创建成功的响应
    res.status(201).json({
      _id: result.insertedId,
      ...newPet
    });

  } catch (err) {
    console.error("添加宠物失败:", err);
    res.status(500).json({ 
      error: "服务器内部错误",
      details: err.message 
    });
  }
});

// 启动服务
app.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`);
});