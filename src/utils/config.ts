const config = {
  'oauth_uri': '',
  'redirect_uri': '', 
  'client_id': 'XXXXXXXXX', 
  'client_secret': 'XXXXXXXXX', 
};

// 本地开发环境下 （如下的信息在本地开发可以当测试用）
if (process.env.NODE_ENV === 'development') {
  config.redirect_uri = "http://localhost:3001/login"
  config.client_id = "502176cec65773057a9e"
  config.client_secret = "65d444de381a026301a2c7cffb6952b9a86ac235"
}
export default config;
