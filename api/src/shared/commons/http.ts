import { StatusCode } from '../commons'
import { HttpResponse } from '../interfaces'

export const success = (data: any, message?: string, statusCode?: number): HttpResponse => ({
  statusCode: statusCode ?? StatusCode.OK,
  body: {
    message: message ?? 'request_successfully_completed',
    data: data
  }
})


export const created = (data: any, message?: string): HttpResponse => ({
  statusCode: StatusCode.CREATED,
  body: {
    message: message ?? 'entity_successfully_created',
    data: data
  }
})
