import { options } from '../config/config.js';
import { sendGet, sendPost, checkResponseTime, checkResponseContent } from '../utils/http.js';

// 导出测试配置
export { options };

// 默认函数，包含主要测试逻辑
export default function() {
  // GET请求测试
  const getResponse = sendGet('https://jsonplaceholder.typicode.com/users');
  checkResponseTime(getResponse, 400);  // 检查响应时间是否小于400ms
  checkResponseContent(getResponse, 'email');  // 检查响应内容是否包含'email'字段

  // POST请求测试
  const postData = { name: 'test user', email: 'test@example.com' };
  const postResponse = sendPost('https://jsonplaceholder.typicode.com/users', JSON.stringify(postData), {
    headers: { 'Content-Type': 'application/json' },
  });
  checkResponseTime(postResponse, 600);  // POST请求通常需要更多时间，设置更宽松的阈值
  checkResponseContent(postResponse, 'id');  // 检查响应是否包含'id'字段
}