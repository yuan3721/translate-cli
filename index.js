#!/usr/bin/env node

require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');
// const clipboard = require('clipboardy');

const appKey = process.env.YOUDAO_APP_KEY;
const appSecret = process.env.YOUDAO_APP_SECRET;


function truncate(q) {
  const len = q.length;
  return len <= 20 ? q : q.slice(0, 10) + len + q.slice(-10);
}

function getSign(q, salt, curtime) {
  const str = appKey + truncate(q) + salt + curtime + appSecret;
  return crypto.createHash('sha256').update(str).digest('hex');
}

async function translate(q, from = 'auto', to = 'zh-CHS') {
  const salt = Date.now();
  const curtime = Math.floor(Date.now() / 1000);
  const sign = getSign(q, salt, curtime);

  const data = {
    q,
    appKey,
    salt,
    from,
    to,
    sign,
    signType: 'v3',
    curtime,
  };

  try {
    const res = await axios.post('https://openapi.youdao.com/api', null, {
      params: data,
    }); 
    const result = res.data;
    // console.log(result)
    if (result.translation) {
      console.log(`✅ ${q} → \n ${result.translation.join(', ')}`);
      // await clipboard.write(result.translation.join(', '));
     console.log('✅ 已复制到剪贴板');
    } else {
      console.error('❌ 翻译失败:', result);
    }
  } catch (err) {
    console.error('❌ 网络请求失败:', err.message);
  }
}

// 获取命令行参数
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('用法：translate "hello world"');
  process.exit(1);
}
const input = args.join(' ');
translate(input);