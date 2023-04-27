import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/pages'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: 'Sign in to your account'
    })

    const emailInput = screen.getByText('Email address')
    const passwordInput = screen.getByText('Password')
    const sigInButton = screen.getByText('Sign In')

    expect(heading).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(sigInButton).toBeInTheDocument()
  })
})