import http from 'k6/http';
import { check } from 'k6';

// 检查HTTP响应状态
export function checkHttpStatus(response, expectedStatus = 200) {
  return check(response, {
    [`status is ${expectedStatus}`]: (r) => r.status === expectedStatus,
  });
}

// 检查响应时间
export function checkResponseTime(response, maxDuration) {
  return check(response, {
    [`response time < ${maxDuration}ms`]: (r) => r.timings.duration < maxDuration,
  });
}

// 检查响应体包含特定内容
export function checkResponseContent(response, text) {
  return check(response, {
    [`response body contains "${text}"`]: (r) => r.body.includes(text),
  });
}

// HTTP客户端工具函数
export function sendGet(url, params = {}) {
  const response = http.get(url, params);
  checkHttpStatus(response);
  return response;
}

export function sendPost(url, data = {}, params = {}) {
  const response = http.post(url, data, params);
  checkHttpStatus(response);
  return response;
}