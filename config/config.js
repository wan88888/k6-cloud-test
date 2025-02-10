export const options = {
  // 测试场景配置
  stages: [
    { duration: '10s', target: 10 },    // 预热阶段：10s内逐步增加到10个虚拟用户
    { duration: '10s', target: 10 },    // 稳定阶段：维持10个虚拟用户10s
    { duration: '10s', target: 30 },    // 加压阶段：10秒内增加到30个虚拟用户
    { duration: '5s', target: 30 },     // 高峰阶段：维持30个虚拟用户5s
    { duration: '10s', target: 0 },    // 缓冲阶段：10s内逐步降至0
  ],
  // 阈值设置
  thresholds: {
    http_req_duration: ['p(95)<800'],    // 95%的请求应在800ms内完成
    http_req_failed: ['rate<0.01'],      // 失败率应小于1%
    http_reqs: ['rate>50'],             // 每秒请求数应大于50
  },
  // K6 Cloud执行配置
  ext: {
    loadimpact: {
      projectID: 3638280,               // 替换为你的项目ID
      name: 'test1'
    }
  },
  // 云端执行配置
  cloud: {
    distribution: {
      'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 }
    }
  }
};