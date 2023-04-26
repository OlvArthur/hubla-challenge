import axios from 'axios'
import { parseCookies } from 'nookies'
import type { Request } from 'express'
import type { NextPageContext, NextApiRequest } from 'next'

export const getApiClient = (serverSideContext?: Pick<NextPageContext, 'req'> | { req: NextApiRequest } | { req: Request }) => {
  const { 'hubla:token': token } = parseCookies(serverSideContext)

  const api = axios.create({
    baseURL: 'http://localhost:5000'
  })

  if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
