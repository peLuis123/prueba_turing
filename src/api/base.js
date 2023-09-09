import axios from 'axios'

const apiClient = axios.create({ baseURL: `http://localhost:3000/v1` })

// Add a request interceptor
apiClient.interceptors.request.use((config) => {
  // Do something before request is sent
  console.log(config, 'soy interceptor inicial 11')

  config.headers = {
    'accept': 'application/json'
    // 'Content-Type': 'application/json'
  }

  return config;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add a response interceptor
apiClient.interceptors.response.use(response => response, async (error) => {
  const url = error.config.url
  const status = error?.response?.status
  const message = error?.response?.data?.message || ''
  console.warn('soy interceptor response 22', { url, status, message })
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

const { get, post, put, patch, delete: destroy } = apiClient

export { get, post, put, patch, destroy }