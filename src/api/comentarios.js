import { post, get, destroy } from './base'
export const comentarios = {
  getComments: () => get('/comentarios/getcomments'),
  addComents: ({ commentData }) => post('/comentarios/addcomment', commentData),
  // editComment: ({id, params}) => put()
  deleteComment: ({ commentId, params }) => {
    console.log('desde la api'+commentId)
    return destroy(`/comentarios/deletecomment/${commentId}`, { params })
  },
}