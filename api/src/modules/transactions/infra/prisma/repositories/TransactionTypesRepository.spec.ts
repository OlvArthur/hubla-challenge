import { describe, beforeEach, it, expect } from 'vitest'

import { TransactionTypesRepository } from './TransactionTypesRepository'
import { MockContext, createMockContext } from '../../../../../shared/infra/prisma/__mocks__/ClientInstance'


let mockContext: MockContext
let sut: TransactionTypesRepository

describe('when a transaction type is searched', async () => {

  beforeEach(() => {
    mockContext = createMockContext()

    sut = new TransactionTypesRepository(mockContext)
  })
  
  it('should be allowed search by a group of ids', async () => {
    const typeIds = [1,4,6]

    await sut.findByIds(typeIds)

    expect(mockContext.prisma.transactionType.findMany).toHaveBeenCalledOnce()
    expect(mockContext.prisma.transactionType.findMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: typeIds
        }
      }
    })
  })
})
