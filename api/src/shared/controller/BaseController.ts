import { HttpRequest, HttpResponse } from 'shared/interfaces'

export interface BaseController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
