import { Resolver, useForm } from 'react-hook-form'
import { useAuth, SignInCredentials } from '../context/auth'
import { Button as SubmitButton } from '../components/Button'

type FormValues = {
  email: string
  password: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email && values.password ? values : {},
    errors: !values.email || !values.password
      ? {
          email: {
            type: 'required',
            message: 'This is required.',
          },
          password: {
            type: 'required',
            message: 'This is required'
          }
        }
      : {},
  }
}

export default function SignIn() {
  const { register, handleSubmit } = useForm<FormValues>({ resolver });
  const { signIn } = useAuth()

  async function handleSign({ email, password }: SignInCredentials) {
    try {
      await signIn({
        email,
        password
      })
    } catch {
      alert('Login failed: Invalid username or password.\n Please check your credentials and try again')
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(handleSign)}>
            <div>
              <label htmlFor='email' className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register('email')}
                  id="email" name='email' type='email' autoComplete='email' required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register('password')}
                  id='password' name='password' type='password' autoComplete='current-password' required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <SubmitButton text="Sign In" />
            </div>
          </form>

        </div>
      </div>
    </>
  )
}