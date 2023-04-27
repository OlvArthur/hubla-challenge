import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import request from 'supertest'

import { prisma } from '../shared/infra/prisma/ClientInstance'
import { app } from '../shared/infra/express/server'
import { StatusCode } from '../shared/commons'

describe('/transactions', () => {

  describe('[GET] /transactions', () => {
    beforeEach(async () => {
      await prisma.transaction.create({
        data: {
          date: new Date(),
          valueInCents: 12750,
          transactionType: {
            create: {
              description: 'Creator Sale',
              nature: 'INFLOW',
              signal: 'ADDITION'
            }
          },
          seller: {
            create: {
              email: 'jhon.doe@hub.la',
              name: 'jhon doe',
              password: await hash('candidato contratado', 8),
              isAdmin: true
            }
          },
          product: {
            create: {
              description: 'full stack developer'
            }
          }
        }
      })

      await prisma.transaction.create({
        data: {
          date: new Date(),
          valueInCents: 12750,
          transactionType: {
            create: {
              description: 'Affiliate Sale',
              nature: 'INFLOW',
              signal: 'ADDITION'
            }
          },
          seller: {
            create: {
              name: 'jane doe',
              email: 'jane.doe@hub.la',
              password: await hash('candidato contratado', 8)
            }
          },
          product: {
            create: {
              description: 'curso de bem-estar'
            }
          }
        }
      })
    })
   
    it('should list all transactions if the user is admin', async () => {
      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jhon.doe@hub.la',
        password: 'candidato contratado'
      })

      const { body, statusCode } = await request(app).get('/transactions').set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.OK)
      expect(body.data.transactions.length).toEqual(2)
    })

    it('should list creator and affiliates transactions if the user is a creator', async () => {
      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jhon.doe@hub.la',
        password: 'candidato contratado'
      })

      const { body, statusCode } = await request(app).get('/transactions').set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.OK)
      expect(body.data.transactions.length).toEqual(2)
    })

    it('should list only affiliates transactions if the seller is an affiliate', async () => {
      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jane.doe@hub.la',
        password: 'candidato contratado'
      })

      const { body, statusCode } = await request(app).get('/transactions').set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.OK)
      expect(body.data.transactions.length).toEqual(1)
    })
  })

  describe('[POST] /transactions', () => {

    beforeEach(async () => {
      await prisma.seller.create({
        data: {
          name: 'jane doe',
          email: 'jane.doe@hub.la',
          password: await hash('candidato contratado', 8)
        }
      })

      await prisma.transactionType.upsert({
        where: {
          id: 1,
        },
        update: {},
        create: {
          id: 1,
          description: 'Creator Sale',
          nature: 'INFLOW',
          signal: 'ADDITION'
        }
      })
    
      await prisma.transactionType.upsert({
        where: {
          id: 2,
        },
        update: {},
        create: {
          id: 2,
          description: 'Affiliate Sale',
          nature: 'INFLOW',
          signal: 'ADDITION'
        }
      })

      await prisma.product.create({
        data: {
          description: 'curso de bem-estar',
        }
      })
    })

    it('should create many transactions', async () => {
      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jane.doe@hub.la',
        password: 'candidato contratado'
      })

      const response = await request(app).post('/transactions').send({
        transactions: [
          {
            typeId: 1,
            date: "2022-01-16T14:13:54-03:00",
            valueInCents: 12750,
            productDescription: 'CURSO DE BEM-ESTAR',
            sellerName: 'jane doe',
          },
          {
            typeId: 1,
            date: "2022-01-16T14:13:54-03:00",
            valueInCents: 12750,
            productDescription: 'CURSO DE BEM-ESTAR',
            sellerName: 'jane doe'
          }
        ]
      }).set({ Authorization: `Bearer ${token}`})

      const { body, statusCode } = response

      expect(statusCode).toEqual(StatusCode.CREATED)
      expect(body.data.createdTransactionsCount).toEqual(2)
    })

    it('should fail to create if a seller of any transaction could not be found', async()  => {
      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jane.doe@hub.la',
        password: 'candidato contratado'
      })

      const { body, statusCode } = await request(app).post('/transactions').send({
        transactions: [
          {
            typeId: 1,
            date: "2022-01-16T14:13:54-03:00",
            valueInCents: 12750,
            productDescription: 'CURSO DE BEM-ESTAR',
            sellerName: 'jane doe',
          },
          {
            typeId: 1,
            date: "2022-01-16T14:13:54-03:00",
            valueInCents: 12750,
            productDescription: 'CURSO DE BEM-ESTAR',
            sellerName: 'inexistent seller'
          }
        ]
      }).set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.BAD_REQUEST)
      expect(body.message).toEqual('the operation could not be completed due to an inexistent seller name')
    })

    it('should fail to create if a product of any transaction could not be found', async()  => {
      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jane.doe@hub.la',
        password: 'candidato contratado'
      })

      const { body, statusCode } = await request(app).post('/transactions').send({
        transactions: [
          {
            typeId: 1,
            date: "2022-01-16T14:13:54-03:00",
            valueInCents: 12750,
            productDescription: 'CURSO DE BEM-ESTAR',
            sellerName: 'jane doe',
          },
          {
            typeId: 1,
            date: "2022-01-16T14:13:54-03:00",
            valueInCents: 12750,
            productDescription: 'inexistent product',
            sellerName: 'jane doe'
          }
        ]
      }).set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.BAD_REQUEST)
      expect(body.message).toEqual('the operation could not be completed due to an inexistent product description')
    })
  })
})
