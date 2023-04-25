import { describe, expect, it } from 'vitest'
import request from 'supertest'

import { prisma } from '../shared/infra/prisma/ClientInstance'
import { app } from '../shared/infra/express/server'
import { StatusCode } from '../shared/commons'
import { hash } from 'bcryptjs'

describe('/transactions', () => {

  describe('[GET] /transactions', () => {
   
    it('should list all transactions if the user is admin', async () => {
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


      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jhon.doe@hub.la',
        password: 'candidato contratado'
      })

      const { body, statusCode } = await request(app).get('/transactions').set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.OK)
      expect(body.data.transactions.length).toEqual(2)
    })

    it('should list creator and affiliates transactions if the user is a creator', async () => {
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
              password: await hash('candidato contratado', 8),
              creator: {
                connect: {
                  email: 'jhon.doe@hub.la',
                }
              }
            }
          },
          product: {
            create: {
              description: 'curso de bem-estar'
            }
          }
        }
      })


      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jhon.doe@hub.la',
        password: 'candidato contratado'
      })

      const { body, statusCode } = await request(app).get('/transactions').set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.OK)
      expect(body.data.transactions.length).toEqual(2)
    })

    it('should list only affiliates transactions if the seller is an affiliate', async () => {
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
              password: await hash('candidato contratado', 8),
              creator: {
                connect: {
                  email: 'jhon.doe@hub.la',
                }
              }
            }
          },
          product: {
            create: {
              description: 'curso de bem-estar'
            }
          }
        }
      })


      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jane.doe@hub.la',
        password: 'candidato contratado'
      })

      const { body, statusCode } = await request(app).get('/transactions').set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.OK)
      expect(body.data.transactions.length).toEqual(1)
    })
  })
})
