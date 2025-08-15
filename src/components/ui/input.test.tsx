import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input Component', () => {
  it('should render input element', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('should accept and display typed text', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    
    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement
    await user.type(input, 'Hello World')
    
    expect(input.value).toBe('Hello World')
  })

  it('should handle different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />)
    let input = screen.getByPlaceholderText('Email')
    expect(input).toHaveAttribute('type', 'email')

    rerender(<Input type="password" placeholder="Password" />)
    input = screen.getByPlaceholderText('Password')
    expect(input).toHaveAttribute('type', 'password')

    rerender(<Input type="number" placeholder="Number" />)
    input = screen.getByPlaceholderText('Number')
    expect(input).toHaveAttribute('type', 'number')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled input" />)
    
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('should apply default styling classes', () => {
    render(<Input placeholder="Styled input" />)
    
    const input = screen.getByPlaceholderText('Styled input')
    expect(input).toHaveClass(
      'flex',
      'h-10',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2',
      'text-sm'
    )
  })

  it('should accept additional className', () => {
    render(<Input className="custom-input-class" placeholder="Custom" />)
    
    const input = screen.getByPlaceholderText('Custom')
    expect(input).toHaveClass('custom-input-class')
  })

  it('should handle onChange event', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()
    
    render(<Input placeholder="Change me" onChange={handleChange} />)
    
    const input = screen.getByPlaceholderText('Change me')
    await user.type(input, 'a')
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('should handle onFocus and onBlur events', async () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    const user = userEvent.setup()
    
    render(
      <Input 
        placeholder="Focus me" 
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
    
    const input = screen.getByPlaceholderText('Focus me')
    
    await user.click(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)
    
    await user.tab()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('should accept and apply value prop', () => {
    render(<Input value="Preset value" readOnly />)
    
    const input = screen.getByDisplayValue('Preset value')
    expect(input).toBeInTheDocument()
  })

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} placeholder="With ref" />)
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.placeholder).toBe('With ref')
  })
})