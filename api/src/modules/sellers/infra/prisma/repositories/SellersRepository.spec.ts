import { describe, beforeEach, it, expect, vi } from 'vitest'
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended'

import { PrismaClient } from '../../../../../shared/infra/prisma/client'
import { SellersRepository } from './SellersRepository'

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

const createMockContext = (): MockContext => ({ prisma: mockDeep<PrismaClient>() })

let mockContext: MockContext
let sut: SellersRepository

describe('When a seller is searched', () => {
  beforeEach(() => {
    mockContext = createMockContext()

    sut = new SellersRepository(mockContext)
  })

  it('should be allowed search by id', async () => {
    const sellerId = 2
    
    await sut.findById(sellerId)

    expect(mockContext.prisma.seller.findUnique).toHaveBeenCalledOnce()
    expect(mockContext.prisma.seller.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: sellerId
        }
      })
    )
  })

  it('should be allowed search by group of ids', async () => {
    const sellerIds = [2,4,6]
    
    await sut.findByIds(sellerIds)

    expect(mockContext.prisma.seller.findMany).toHaveBeenCalledOnce()
    expect(mockContext.prisma.seller.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: {
            in: sellerIds
          }
        }
      })
    )
  })

  it('should be allowed search by name', async () => {
    const sellerName = 'jhon doe'
    
    await sut.findByName(sellerName)

    expect(mockContext.prisma.seller.findUnique).toHaveBeenCalledOnce()
    expect(mockContext.prisma.seller.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          name: sellerName
        }
      })
    )
  })

  it('should be allowed search by group of names', async () => {
    const sellerNames = ['jhon doe', 'jane doe']
    
    await sut.findByNames(sellerNames)

    expect(mockContext.prisma.seller.findMany).toHaveBeenCalledOnce()
    expect(mockContext.prisma.seller.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          name: {
            in: sellerNames
          }
        }
      })
    )
  })

  it('should be allowed search by email', async () => {
    const sellerEmail = 'jhon.doe@test.com'
    
    await sut.findByEmail(sellerEmail)

    expect(mockContext.prisma.seller.findUnique).toHaveBeenCalledOnce()
    expect(mockContext.prisma.seller.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          email: sellerEmail
        }
      })
    )
  })
})
