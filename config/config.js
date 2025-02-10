export const options = {
  // 测试场景配置
  stages: [
    { duration: '5s', target: 20 },    // 预热阶段：5s内逐步增加到20个虚拟用户
    { duration: '5s', target: 20 },     // 稳定阶段：维持20个虚拟用户5s
    { duration: '5s', target: 50 },    // 加压阶段：5秒内增加到50个虚拟用户
    { duration: '2s', target: 50 },     // 高峰阶段：维持50个虚拟用户2s
    { duration: '5s', target: 0 },     // 缓冲阶段：5s内逐步降至0
  ],
  // 阈值设置
  thresholds: {
    http_req_duration: ['p(95)<500'],    // 95%的请求应在500ms内完成
    http_req_failed: ['rate<0.01'],      // 失败率应小于1%
    http_reqs: ['rate>100'],            // 每秒请求数应大于100
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