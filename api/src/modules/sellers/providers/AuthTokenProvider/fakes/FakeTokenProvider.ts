import { ITokenProvider } from '../interfaces/ITokenProvider'

export class FakeTokenProvider implements ITokenProvider {
  generateToken(payload: string): string {
    return payload
  }
}
