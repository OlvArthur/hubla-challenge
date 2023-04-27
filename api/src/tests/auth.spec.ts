import { beforeEach, describe,  expect,  it } from 'vitest'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { verify } from 'jsonwebtoken'


import { app } from '../shared/infra/express/server'
import { StatusCode } from '../shared/commons'
import authConfig from '../config/auth'
import { prisma } from '../shared/infra/prisma/ClientInstance'


describe('/login', () => {

  describe('[POST] /login', () => {
    beforeEach(async () => {
      await prisma.seller.create({
        data: {
          email: 'arthur.oliveira@hub.la',
          name: 'arthur oliveira',
          password: await hash('candidato contratado', 8),
        }
      })
    })

    it('should return 200 as status code and authenticated seller info', async () => {
      const { body: { message, data }, statusCode } = await request(app).post('/login').send({
          email:'arthur.oliveira@hub.la',
          password: "candidato contratado"
      })


      expect(statusCode).toEqual(StatusCode.OK)
      expect(message).toEqual('request_successfully_completed')
      expect(data).toHaveProperty('seller')
      expect(data).toHaveProperty('token')
      expect(verify(data.token, authConfig.jwt.secret))
    })

    it('should return 400 as status code if the email does not exist', async () => {
      const { body: { message, status }, statusCode } = await request(app).post('/login').send({
        email:'wrong.email@test.com',
        password: "candidato contratado"
      })

      expect(statusCode).toEqual(StatusCode.BAD_REQUEST)
      expect(message.toLowerCase()).toEqual('Login failed: Invalid username or password'.toLowerCase())
      expect(status.toLowerCase()).toEqual('error'.toLowerCase())
    })

    it('should return 400 as status code if the email exists, but the password is incorrect', async () => {
      const { body: { message, status }, statusCode } = await request(app).post('/login').send({
        email: 'arthur.oliveira@hub.la',
        password: "wrong password"
      })

      expect(statusCode).toEqual(StatusCode.BAD_REQUEST)
      expect(message.toLowerCase()).toEqual('Login failed: Invalid username or password'.toLowerCase())
      expect(status.toLowerCase()).toEqual('error'.toLowerCase())
    })
  })
})

