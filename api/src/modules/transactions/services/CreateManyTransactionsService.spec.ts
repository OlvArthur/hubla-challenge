import { beforeEach, describe, expect, it } from "vitest";

import CreateManyTransactionsService from "./CreateManyTransactionsService";
import FakeTransactionsRepository from "../repositories/fakes/FakeTransactionsRepository";
import { ICreateManyTransactionsRepository } from "../repositories/ICreateManyTransactionsRepository";
import { IFindManySellersRepository } from "../../sellers/repositories/IFindManySellersRepository";
import FakeSellersRepository from "../../sellers/repositories/fakes/FakeSellersRepository";
import { ICreateManyTransactionsService } from "./interfaces/ICreateManyTransactionsService";

describe('When many transactions are created', () => {
  let sut: ICreateManyTransactionsService
  let fakeTransactionsRepository: ICreateManyTransactionsRepository
  let fakeSellersRepository: IFindManySellersRepository

  beforeEach(() => {
    fakeSellersRepository = new FakeSellersRepository()
    fakeTransactionsRepository = new FakeTransactionsRepository()

    sut = new CreateManyTransactionsService(fakeSellersRepository, fakeTransactionsRepository)
  })

  it('should save them successfully', async () => {
    const transactionsToBeCreated = [
      {
        date: new Date(),
        typeId: 3,
        productDescription: 'Curso Full Stack',
        sellerName: 'Jhon Doe',
        valueInCents: 3544
      },
      {
        date: new Date(),
        typeId: 2,
        productDescription: 'Dominando investimentos',
        sellerName: 'Jhon Doe',
        valueInCents: 255
      },
    ]

    const { count: createdTransactionsCount } = await sut.execute(transactionsToBeCreated)

    expect(createdTransactionsCount).toEqual(2)
  })

  it('should fail if there is any transaction from an inexistent seller', async () => {
    const transactionsToBeCreated = [
      {
        date: new Date(),
        typeId: 3,
        productDescription: 'Curso Full Stack',
        sellerName: 'Inexistent Seller',
        valueInCents: 3544
      },
      {
        date: new Date(),
        typeId: 2,
        productDescription: 'Dominando investimentos',
        sellerName: 'Jhon Doe',
        valueInCents: 255
      }
    ]

    await expect(sut.execute(transactionsToBeCreated)).rejects.toThrowError()
  })
})
