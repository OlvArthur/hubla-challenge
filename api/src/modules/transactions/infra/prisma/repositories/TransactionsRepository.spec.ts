import { describe, beforeEach, it, expect } from 'vitest'

import { TransactionsRepository } from './TransactionsRepository'
import { ICreateTransactionDTO } from 'modules/transactions/DTOs'

import { createMockContext, MockContext } from '../../../../../shared/infra/prisma/__mocks__/ClientInstance'

let mockContext: MockContext
let sut: TransactionsRepository

describe('When many transactions are created', () => {
  beforeEach(() => {
    mockContext = createMockContext()

    sut = new TransactionsRepository(mockContext)
  })

  it('should return the created transactions count', async () => {
    const transactionsToBeCreated: ICreateTransactionDTO[] = [
      {
        date: new Date(),
        typeId: 3,
        productId: 2,
        sellerId: 4,
        valueInCents: 3544
      }
    ]

    const mockPrismaResponse = { count: 1 }

    mockContext.prisma.transaction.createMany.mockResolvedValue(mockPrismaResponse)

    const { count } = await sut.createMany(transactionsToBeCreated)

    expect(count).toEqual(1)
    expect(mockContext.prisma.transaction.createMany).toHaveBeenCalledOnce()
    expect(mockContext.prisma.transaction.createMany).toHaveBeenCalledWith({
      data: transactionsToBeCreated,
      skipDuplicates: true
    })
  })
})

describe('When transactions are listed', () => {
  beforeEach(() => {
    mockContext = createMockContext()

    sut = new TransactionsRepository(mockContext)
  })

  it('should be able to return all transactions in memory', async () => {
    await sut.listAllTransactions()

    expect(mockContext.prisma.transaction.findMany).toHaveBeenCalledOnce()
    expect(mockContext.prisma.transaction.findMany).toHaveBeenCalledWith(
      expect.not.objectContaining({
        where: expect.objectContaining({})
      })
    )
  })

  it('should be able to return a creator and its affiliates transactions', async () => {
    const creatorId = 2
    const affiliatesIds = [3,5]
    await sut.listCreatorTransactions(creatorId, affiliatesIds)

    expect(mockContext.prisma.transaction.findMany).toHaveBeenCalledOnce()
    expect(mockContext.prisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          sellerId: {
            in: [creatorId, ...affiliatesIds]
          }
        }
      })
    )
  })

  it('should be able to return an affiliate`s transactions', async () => {
    const affiliateId = 3
    await sut.listAffiliateTransactions(affiliateId)

    expect(mockContext.prisma.transaction.findMany).toHaveBeenCalledOnce()
    expect(mockContext.prisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          sellerId: affiliateId
        }
      })
    )

  })
})
