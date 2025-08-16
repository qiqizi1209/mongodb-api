const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// 获取所有数据
router.get('/data', async (req, res) => {
  try {
    const items = await Data.find().sort({ createdAt: -1 }).limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: '服务器错误' });
  }
});

// 创建新数据（测试用）
router.post('/data', async (req, res) => {
  try {
    const newItem = new Data({
      title: req.body.title || '默认标题',
      content: req.body.content
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: '创建失败' });
  }
});

module.exports = router;