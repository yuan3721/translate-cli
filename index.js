#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const readline = require('readline');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const axios = require('axios');
const crypto = require('crypto');
const clipboard = require('clipboardy');

const envPath = path.join(__dirname, '.env');

// 检查是否需要初始化配置
async function checkAndInitConfig() {
  if (!fs.existsSync(envPath)) {
    console.log('🎉 欢迎使用有道翻译CLI！首次使用需要配置');
    await initConfig();
    console.log('\n✅ 配置完成！现在可以开始使用了\n');
    // 重新加载环境变量
    require('dotenv').config({ path: envPath });
    return true;
  }

  // 检查是否配置完整
  const envContent = fs.readFileSync(envPath, 'utf-8');
  if (!envContent.includes('YOUDAO_APP_KEY=') ||
    envContent.includes('your_app_key_here') ||
    !process.env.YOUDAO_APP_KEY) {
    console.log('⚠️  检测到配置不完整，重新配置');
    await initConfig();
    console.log('\n✅ 配置完成！\n');
    require('dotenv').config({ path: envPath });
    return true;
  }
  return false;
}

// 初始化配置
async function initConfig() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise((resolve) => {
    rl.question(prompt, resolve);
  });

  console.log('\n📝 请输入你的有道智云应用配置：');
  console.log('   (在 https://ai.youdao.com/console/ 创建应用获取)\n');

  const appKey = await question('请输入 APP_KEY: ');
  const appSecret = await question('请输入 APP_SECRET: ');
  const autoCopy = await question('是否自动复制翻译结果到剪贴板？(y/n，默认y): ');

  rl.close();

  const autoCopyValue = !autoCopy || autoCopy.toLowerCase() === 'y' || autoCopy.toLowerCase() === 'yes';

  const envContent = `YOUDAO_APP_KEY=${appKey.trim()}
YOUDAO_APP_SECRET=${appSecret.trim()}
AUTO_COPY=${autoCopyValue}
`;

  fs.writeFileSync(envPath, envContent);
}

const appKey = process.env.YOUDAO_APP_KEY;
const appSecret = process.env.YOUDAO_APP_SECRET;
const autoCopy = process.env.AUTO_COPY !== 'false';

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
  console.log('🔄 翻译中...');
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
    if (result.translation) {
      const translation = result.translation.join(', ');
      console.log(`✅ ${q} → \n ${translation}`);

      if (autoCopy) {
        try {
          await clipboard.write(translation);
          console.log('📋 已复制到剪贴板');
        } catch (err) {
          console.log('⚠️  复制到剪贴板失败:', err.message);
        }
      }
    } else {
      console.error('❌ 翻译失败:', result);
    }
  } catch (err) {
    console.error('❌ 网络请求失败:', err.message);
  }
}

// 主函数
async function main() {
  // 检查并初始化配置
  await checkAndInitConfig();

  // 获取命令行参数
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('用法：translate "hello world"');
    process.exit(1);
  }

  const input = args.join(' ');
  await translate(input);
}

main();