import { beforeEach, describe, expect, it } from "vitest";

import AppError from '../../../shared/commons/AppError'

import { CreateManyTransactionsService } from "./CreateManyTransactionsService";
import { FakeTransactionsRepository } from "../repositories/fakes/FakeTransactionsRepository";
import { ICreateManyTransactionsRepository } from "../repositories/ICreateManyTransactionsRepository";
import { IFindManySellersRepository } from "../../sellers/repositories/IFindManySellersRepository";
import { FakeSellersRepository } from "../../sellers/repositories/fakes/FakeSellersRepository";
import { ICreateManyTransactionsService } from "./interfaces/ICreateManyTransactionsService";
import { IFindManyProductsRepository } from "../../products/repositories/IFindManyProductsRepository";
import FakeProductsRepository from "../../products/repositories/fakes/FakeProductsRepository";
import { FakeTransactionTypesRepository } from "../repositories/fakes/FakeTransactionTypesRepository";
import { IFindManyTransactionTypesRepository } from "../repositories/IFindManyTransactionTipesRepository";

describe('When many transactions are created', () => {
  let sut: ICreateManyTransactionsService
  let fakeTransactionsRepository: ICreateManyTransactionsRepository
  let fakeSellersRepository: IFindManySellersRepository
  let fakeProductsRepository: IFindManyProductsRepository
  let fakeTransactionTypesRepository: IFindManyTransactionTypesRepository

  beforeEach(() => {
    fakeSellersRepository = new FakeSellersRepository()
    fakeProductsRepository = new FakeProductsRepository()
    fakeTransactionTypesRepository = new FakeTransactionTypesRepository()
    fakeTransactionsRepository = new FakeTransactionsRepository()

    sut = new CreateManyTransactionsService(fakeSellersRepository, fakeProductsRepository, fakeTransactionTypesRepository, fakeTransactionsRepository)
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

  it('should save with case insensitive product description and seller name search', async () => {
    const transactionsToBeCreated = [
      {
        date: new Date(),
        typeId: 3,
        productDescription: 'CuRsO fulL STAck',
        sellerName: 'Jhon Doe',
        valueInCents: 3544
      },
      {
        date: new Date(),
        typeId: 2,
        productDescription: 'Dominando investimentos',
        sellerName: 'jHoN doE',
        valueInCents: 255
      },
    ]

    const { count: createdTransactionsCount } = await sut.execute(transactionsToBeCreated)

    expect(createdTransactionsCount).toEqual(2)
  })

  it('should save regardless of leading or trailing space on any product description', async () => {
    const transactionsToBeCreated = [
      {
        date: new Date(),
        typeId: 3,
        productDescription: 'curso full stack     ',
        sellerName: 'jhon doe',
        valueInCents: 3544
      },
      {
        date: new Date(),
        typeId: 2,
        productDescription: '     Dominando investimentos',
        sellerName: 'jhon doe',
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

    await expect(sut.execute(transactionsToBeCreated)).rejects.toBeInstanceOf(AppError)
  })

  it('should fail if there is any transaction from an inexistent product', async () => {
    const transactionsToBeCreated = [
      {
        date: new Date(),
        typeId: 3,
        productDescription: 'inexistent product',
        sellerName: 'Jhon Doe',
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

    await expect(sut.execute(transactionsToBeCreated)).rejects.toBeInstanceOf(AppError)
  })

  it('should fail if there is any transaction from an inexistent type', async () => {
    const transactionsToBeCreated = [
      {
        date: new Date(),
        typeId: 8,
        productDescription: 'Curso Full Stack',
        sellerName: 'jhon Doe',
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

    await expect(sut.execute(transactionsToBeCreated)).rejects.toBeInstanceOf(AppError)
  })
})
