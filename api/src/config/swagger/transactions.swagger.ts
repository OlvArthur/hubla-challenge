export const getTransactions = {
  tags: ['Transactions'],
  description: 'Get all list the authenticated agent has acesss',
  operationId: 'getTransactions',
  security: [{
    bearerAuth: []
  }],
  responses: {
    "200": {
      description: 'List all transactions',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'request_successfully_completed'
              },
              data: {
                type: 'object',
                properties: {
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
                        },
                        product: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                            },
                            description: {
                              type: 'string'
                            }
                          },
                          seller: {
                            type: 'object',
                            properties: {
                              id: {
                                type: 'string',
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
                              isAffiliatedTo: {
                                type: 'integer',
                                nullable: true,
                                default: null,
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
      }
    }
  }
}


export const createManyTransactions = {
  tags: ['Transactions'],
  description: 'Upload/Creation of multiple transactions',
  operationId: 'createManyTransactions',
  security: [{
    bearerAuth: []
  }],
  requestBody: {
    description: 'Data objects of transactions to be created',
    required: true,
    content: {
      "application/json": {
        schema: {
          type: 'object',
          properties: {
            transactions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  typeId: {
                    type: 'integer',
                    default: 1,
                    description: 'Reference for transaction type'
                  },
                  date: {
                    type: 'string',
                    format: 'date',
                    example: '2022-01-16T14:13:54-03:00',
                  },
                  valueInCents: {
                    type: 'integer',
                    example: 12750
                  },
                  productDescription: {
                    type: 'string',
                    example: 'CURSO DE BEM-ESTAR'
                  },
                  sellerName: {
                    type: 'string',
                    example: 'THIAGO OLIVEIRA'
                  }
                }
              }   
            }
          },

          
        }
      }
    }
  },
  responses: {
    "201": {
      description: 'Create Many Transactions',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                default: 'entity_successfully_created'
              },
              data: {
                type: 'object',
                properties: {
                  createdTransactionsCount: {
                    type: 'integer',
                    example: 4
                  }
                }
              }
            }
          }
        }
      }
    },
    "400": {
      description: 'Transacions could not be created due to an error in request body',
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
                example: 'the operation could no be completed due to an inexistent product description or seller name'
              },
              details: {
                type: 'object',
                properties: {
                  productDescription: {
                    type: 'string',
                    description: 'Description of a missing product, if any, in any transaction',
                    example: 'FULL STACK DEVELOPER'
                  },
                  sellerName: {
                    type: 'string',
                    description: 'Name of a missing seller, if any, in any transaction',
                    example: 'THIAGO OLIVEIRA'
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
