import { post } from './base'

export const Auth = {
  login: ({ data }) => post('/auth/login', data),
  //esta es la forma cuando se quiere enviar imagenes solo se agrega el content type
  registerUser: ({ data }) => post('auth/register', data, {headers: {
    'Content-Type': 'multipart/form-data'
  }}),
}