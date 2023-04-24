import { HttpRequest, HttpResponse } from '../interfaces'

export interface BaseController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
