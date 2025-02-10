# K6性能测试项目

## 项目介绍
本项目是基于K6的性能测试框架，用于执行HTTP接口的性能测试。项目提供了基础的GET和POST请求测试示例，并包含了完整的性能指标监控配置。

## 目录结构
```
├── config/
│   └── config.js          # 测试配置文件
├── tests/
│   └── test.js            # 测试用例文件
├── utils/
│   └── http.js            # HTTP请求工具函数
└── package.json           # 项目依赖配置
```

## 配置说明

### 性能测试配置 (config/config.js)
配置文件定义了以下测试场景：

1. 测试阶段（stages）：
   - 预热阶段：5秒内增加到5个虚拟用户
   - 稳定阶段：维持5个虚拟用户5秒
   - 加压阶段：5秒内增加到15个虚拟用户
   - 高峰阶段：维持15个虚拟用户2秒
   - 缓冲阶段：5秒内降至0个虚拟用户

2. 性能指标阈值：
   - 95%的请求响应时间需小于1200ms
   - 请求失败率需小于2%
   - 每秒请求数需大于20

3. 云端执行配置：
   - 支持在K6 Cloud上执行测试
   - 可配置负载区域分布
   - 通过环境变量配置Cloud Token

### HTTP工具函数 (utils/http.js)
提供以下工具函数：

1. `checkHttpStatus`: 验证HTTP响应状态
2. `checkResponseTime`: 检查响应时间
3. `checkResponseContent`: 检查响应内容
4. `sendGet`: 发送GET请求
5. `sendPost`: 发送POST请求

## 测试用例说明
当前测试用例（tests/test.js）包含两个主要测试场景：

1. GET请求测试
   - 请求URL：https://jsonplaceholder.typicode.com/users
   - 响应时间阈值：400ms
   - 验证响应包含'email'字段

2. POST请求测试
   - 请求URL：https://jsonplaceholder.typicode.com/users
   - 请求数据：包含name和email字段的JSON
   - 响应时间阈值：600ms
   - 验证响应包含'id'字段

## 使用指南

### 环境准备
1. 安装Node.js（建议版本12或以上）
2. 安装k6：
   ```bash
   # 在macOS上安装
   brew install k6

   # 在Ubuntu/Debian上安装
   sudo gpg -k
   sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
   echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
   sudo apt-get update
   sudo apt-get install k6

   # 在Windows上安装
   choco install k6
   ```

3. 安装项目依赖：
   ```bash
   npm install
   ```

### 运行测试
1. 本地执行测试：
   ```bash
   npm test
   ```

2. 在K6 Cloud中执行：
   ```bash
   # 设置K6 Cloud Token
   export K6_CLOUD_TOKEN=<your-token>
   
   # 执行云端测试
   k6 cloud tests/test.js
   ```

### 查看测试结果
测试完成后，K6将输出以下测试结果：

1. 本地执行结果：
   - 请求成功率
   - 响应时间统计（最小、最大、平均、p90、p95）
   - 每秒请求数（RPS）
   - 虚拟用户数量变化

2. Cloud执行结果：
   - 在K6 Cloud平台查看详细的测试报告
   - 支持测试结果历史对比
   - 提供详细的性能指标图表
   - 可导出测试报告

## 注意事项
1. 确保测试环境网络稳定
2. 根据实际需求调整config.js中的性能指标阈值
3. 在使用K6 Cloud前，确保已正确配置Token
4. 测试结果文件（k6-report.json、k6-summary.json）会被自动保存在项目根目录
5. 建议在测试前检查目标服务器的负载状况