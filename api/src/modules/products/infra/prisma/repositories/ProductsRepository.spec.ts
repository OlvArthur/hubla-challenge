import { describe, beforeEach, it, expect } from 'vitest'
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended'
import { PrismaClient } from '../../../../../shared/infra/prisma/client'
import ProductsRepository from './ProductsRepository'

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

const createMockContext = (): MockContext => ({ prisma: mockDeep<PrismaClient>() })

let mockContext: MockContext
let sut: ProductsRepository

describe('When a product is searched', () => {
  beforeEach(() => {
    mockContext = createMockContext()

    sut = new ProductsRepository(mockContext)
  })

  it('should be allowed search by group of descriptions', async () => {
    const productDescriptions = ['product description 1', 'product description 2']

    await sut.findByDescriptions(productDescriptions)

    expect(mockContext.prisma.product.findMany).toHaveBeenCalledOnce()
    expect(mockContext.prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          description: {
            in: productDescriptions
          }
        }
      })
    )

  })
})
