import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

import { FieldValues } from 'react-hook-form'

import api from '../services/api'

interface Seller {
  id: string
  email: string
  name: string
  isAdmin: boolean
  isAffiliatedTo: number | null
  balance: number
}

interface AuthState {
  token: string
  seller: Seller
}

export interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

interface AuthContextData {
  seller: Seller
  signIn(data: SignInCredentials): Promise<{ errorMessage: string } | void>
  signOut(): void
}

interface AuthProviderProps {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [data, setData] = useState<AuthState>(() => {
    const loggedSeller = localStorage.getItem('@Hubla:user')
    const token = localStorage.getItem('@Hubla:token')

    if (loggedSeller && token) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return {
        seller: JSON.parse(loggedSeller),
        token,
      }
    }
    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('login', {
      email,
      password,
    })

    const { data: { token, seller } } = response.data

    localStorage.setItem('@Hubla:seller', JSON.stringify(seller))
    localStorage.setItem('@Hubla:token', token)

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ seller, token })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Hubla:seller')
    localStorage.removeItem('@Hubla:token')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ seller: data.seller, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
