import axios from 'axios';

const ServerRequest = ({ token }: { token?: string } = {}) =>
  axios.create({
    baseURL: 'http://localhost:3005/api',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

export default ServerRequest;
