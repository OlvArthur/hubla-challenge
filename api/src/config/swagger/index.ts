import { login } from './auth.swagger'
import { getTransactions, createManyTransactions } from './transactions.swagger'

export const swaggerDocument = {
  openapi: '3.0.1',
  components: {
    schemas: {},
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    }
  },
  tags: [
    {
      name: 'Auth'
    },
    {
      name: 'Transactions'
    }
  ],
  paths: {
    "/login": {
      "post": login
    },
    "/transactions": {
      "get": getTransactions,
      "post": createManyTransactions
    }
  },
  info: {
      version: '1.0.0',
      title: 'APIs Document',
      description: 'your description here',
      termsOfService: '',
      contact: {
          name: 'Arthur Oliveira',
          email: 'olvarthur@gmail.com',
      },
      license: {
          name: 'Apache 2.0',
          url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
      }
  }
}
