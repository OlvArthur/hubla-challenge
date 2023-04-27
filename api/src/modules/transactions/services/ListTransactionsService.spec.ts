import { beforeEach, describe, it, expect } from 'vitest'

import AppError from '../../../shared/commons/AppError'
import { IListTransactionsService } from './interfaces/IListTransactionsService'
import ListTransactionsService from './ListTransactionsService'
import { IListTransactionsRepository } from '../repositories/IListTransactionsRepository'
import { FakeTransactionsRepository } from '../repositories/fakes/FakeTransactionsRepository'
import { FakeSellersRepository } from '../../sellers/repositories/fakes/FakeSellersRepository'
import { IFindOneSellerRepository } from '../../sellers/repositories/IFindOneSellerRepository'


describe('When transactions are listed', () => {
  let sut: IListTransactionsService
  let fakeTransactionsRepository: IListTransactionsRepository
  let fakeSellersRepository: IFindOneSellerRepository

  beforeEach(() => {
    fakeSellersRepository = new FakeSellersRepository()
    fakeTransactionsRepository = new FakeTransactionsRepository()

    sut = new ListTransactionsService(fakeTransactionsRepository, fakeSellersRepository)
  })

  it('should return all transactions if the user is an admin', async ()=> {
    const adminUserId = 1
    const transactions = await sut.execute(adminUserId)

    expect(transactions.length).toEqual(4)
  })

  it('should return the creator and its affiliates transactions if the user is a creator', async () => {
    const creatorId = 2
    const transactions = await sut.execute(creatorId)

    expect(transactions.length).toEqual(3)
  })

  it('should only return the affiliate`s transactions if the user is an affiliate', async () => {
    const affiliateId = 3
    const transactions = await sut.execute(affiliateId)

    expect(transactions.length).toEqual(2)
  })

  it('should fail if the seller could not be found', async () => {
    const sellerId = 34

    await expect(sut.execute(sellerId)).rejects.toBeInstanceOf(AppError)
  })
})
