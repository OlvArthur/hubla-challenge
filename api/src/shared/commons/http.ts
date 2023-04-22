import { StatusCode } from '../commons'
import { HttpResponse } from '../interfaces'

export const success = (data: any, message?: string, statusCode?: number): HttpResponse => ({
  statusCode: statusCode ?? StatusCode.OK,
  body: {
    message: message ?? 'request_successfully_completed',
    data: data
  }
})
