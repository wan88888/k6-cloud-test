export const options = {
  // 测试场景配置
  stages: [
    { duration: '5s', target: 5 },     // 预热阶段：5s内逐步增加到5个虚拟用户
    { duration: '5s', target: 5 },     // 稳定阶段：维持5个虚拟用户5s
    { duration: '5s', target: 15 },    // 加压阶段：5s内增加到15个虚拟用户
    { duration: '2s', target: 15 },    // 高峰阶段：维持15个虚拟用户2s
    { duration: '5s', target: 0 },     // 缓冲阶段：5s内逐步降至0
  ],
  // 阈值设置
  thresholds: {
    http_req_duration: ['p(95)<1200'],  // 95%的请求应在1200ms内完成
    http_req_failed: ['rate<0.02'],     // 失败率应小于2%
    // http_reqs: ['rate>20'],            // 每秒请求数应大于20
  },
  // K6 Cloud执行配置
  ext: {
    loadimpact: {
      projectID: 3638280,               // 替换为你的项目ID
      name: 'test1',
      token: __ENV.K6_CLOUD_TOKEN  // 从环境变量获取K6 Cloud Token
    }
  },
  // 云端执行配置
  cloud: {
    distribution: {
      'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 }
    }
  }
};