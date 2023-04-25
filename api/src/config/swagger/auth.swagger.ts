export const login = {
  tags: ['Auth'],
  description: "Authenticate a seller or admin and return a valid token",
  operationId: 'authenticate',
  requestBody: {
    description: 'Data of agent trying to authenticate',
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  responses: {
    "200": {
      description: "Get Auth Token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              data: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                  },
                  seller: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                        default: 1,
                      },
                      email: {
                        type: 'string',
                        format: 'email'
                      },
                      name: {
                        type: 'string',
                      },
                      isAdmin: {
                        type: 'boolean'
                      },
                      transactions: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'integer',
                              default: 1,
                            },
                            typeId: {
                              type: 'integer',
                              default: 1,
                              description: 'Reference for transaction type'
                            },
                            productId: {
                              type: 'integer',
                              default: 1,
                              description: 'Reference for the product sold'
                            },
                            sellerId: {
                              type: 'integer',
                              default: 1,
                              description: 'Reference for the seller of the product'
                            },
                            date: {
                              type: 'string',
                              format: 'date',
                              example: '2022-01-15T22:20:30.000Z',
                            },
                            valueInCents: {
                              type: 'integer'
                            },
                            transactionType: {
                              type: 'object',
                              properties: {
                                id: {
                                  type: 'integer',
                                  default: 1
                                },
                                description: {
                                  type: 'string',
                                  example: 'Creator Sale'
                                },
                                nature: {
                                  type: 'string',
                                  example: 'INFLOW'
                                },
                                signal: {
                                  type: 'string',
                                  example: 'ADDITION'
                                }
                              }
                            }
                          }
                        }
                      },
                      balance: {
                        type: 'integer',
                        example: 12750
                      },
                      affiliates: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                            },
                            email: {
                              type: 'string',
                              format: 'email'
                            },
                            name: {
                              type: 'string',
                            },
                            isAdmin: {
                              type: 'boolean',
                              default: false
                            },
                            isAffiliatedTo: {
                              type: 'integer',
                              nullable: true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "400": {
      description: 'Invalid authentication',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                default: 'error'
              },
              message: {
                type: 'string',
                default: 'Login failed: Invalid username or password'
              },
              details: {
                type: 'object'
              }
            }
          }
        }
      }
    }
  }
}
