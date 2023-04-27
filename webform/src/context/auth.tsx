import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from 'next/router'
import { FieldValues } from 'react-hook-form'

import { getApiClient } from '../services/api'

interface Seller {
  id: number
  email: string
  name: string
  isAdmin: boolean
  isAffiliatedTo: number | null
  balance: number
  affiliates: Omit<Seller, 'affiliates'>[]
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
  seller: Seller | undefined
  token: string | undefined
  signIn(data: SignInCredentials): Promise<void>
  signOut(): void
}

interface AuthProviderProps {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [data, setData] = useState<null | AuthState>(null)

  useEffect(() => {
    const { 'hubla:token': token, 'hubla:seller': seller  } = parseCookies()

    if(token) {
      setData({
        seller: JSON.parse(seller),
        token
      })
    }
  }, [])

  const signIn = async ({ email, password }: SignInCredentials) => {
    const api = getApiClient()
    const response = await api.post('/login', {
      email,
      password
    })

    const { data: { token, seller } } = response.data
    
    const oneDay = 60 * 60 * 24
    setCookie(undefined, 'hubla:token', token, {
      maxAge: oneDay
    })
    setCookie(undefined, 'hubla:seller', JSON.stringify(seller), {
      maxAge: oneDay
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setData({
      seller,
      token
    })

    Router.push('/upload')


  }

  const signOut = () => {
    destroyCookie(undefined, 'hubla:seller')
    destroyCookie(undefined, 'hubla:token')

    Router.push('/')
    setData({} as AuthState)
  }

  return (
    <AuthContext.Provider value={{ seller: data?.seller, token: data?.token , signIn, signOut }}>
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
