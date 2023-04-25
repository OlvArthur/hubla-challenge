import { describe, beforeEach, it, expect } from 'vitest'

import AppError from '../../../shared/commons/AppError'

import { IAuthenticateSellerService } from './interfaces'
import { AuthenticateSellerService } from './AuthenticateSellerService'
import { IFindOneSellerRepository } from '../repositories/IFindOneSellerRepository'
import { FakeSellersRepository } from '../repositories/fakes/FakeSellersRepository'
import { FakeTokenProvider } from '../providers/AuthTokenProvider/fakes/FakeTokenProvider'
import { ITokenProvider } from '../providers/AuthTokenProvider/interfaces/ITokenProvider'


describe('When a seller is authenticating', () => {
  let fakeSellersRepository: IFindOneSellerRepository
  let fakeTokenProvider: ITokenProvider
  let sut: IAuthenticateSellerService

  beforeEach(() => {
    fakeTokenProvider = new FakeTokenProvider()
    fakeSellersRepository = new FakeSellersRepository()

    sut = new AuthenticateSellerService(fakeSellersRepository,fakeTokenProvider)
  });

  it('should not be able to authenticate with a non existing email', async () => {
    const userToAuthenticate = {
      email: 'inexistent.email@example.com',
      password: '123456',
    }
    
    await expect(sut.execute(userToAuthenticate)).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to authenticate with a wrong password', async () => {
    const userToAuthenticate = {
      email: 'jhon.doe@test.com',
      password: 'wrong-password',
    }
    
    await expect(sut.execute(userToAuthenticate)).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to authenticate', async () => {
    const userToAuthenticate = {
      email: 'jhon.doe@test.com',
      password: 'testPassword',
    }
    
    const { seller } = await sut.execute(userToAuthenticate)

    expect(seller).toHaveProperty('id');
  });
})
