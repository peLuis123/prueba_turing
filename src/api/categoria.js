import { get } from './base'
export const categoria = {
    allareas:() =>  get('/categorias/allareas'),
    allservices: () => {

      return get('/categorias/allservices')
    },
  }