import { beforeEach, describe, expect, it } from "vitest";

import CreateManyTransactionsService from "./CreateManyTransactionsService";
import FakeTransactionsRepository from "../repositories/fakes/FakeTransactionsRepository";
import { ICreateManyTransactionsRepository } from "../repositories/ICreateManyTransactionsRepository";
import { ICreateTransactionDTO } from "../DTOs/ICreateTransactionDTO";

describe('When many transactions are created', () => {
  let sut: CreateManyTransactionsService
  let fakeTransactionsRepository: ICreateManyTransactionsRepository

  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository()

    sut = new CreateManyTransactionsService(fakeTransactionsRepository)
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
})
