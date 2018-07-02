const isProd = () => process.env.NODE_ENV === 'production';

export default {
  API_SERVER: isProd()
    ? 'https://production-server.url'
    : 'http://localhost:3000',
  CLIENT_SERVER: isProd()
    ? 'https://production-client.url'
    : 'http://localhost:8080',
};
