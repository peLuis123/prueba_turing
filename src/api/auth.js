import { post } from './base'

export const Auth = {
  login: ({ data }) => post('/auth/login', data),
  registerUser: ({ data }) => post('auth/register', data, {headers: {
    'Content-Type': 'multipart/form-data'
  }}),
}