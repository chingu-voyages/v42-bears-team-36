import { render, fireEvent } from '@testing-library/react'

test('button text is correct', () => {
  const { getByText } = render(<button>Click me</button>)
  expect(getByText('Click me')).toBeInTheDocument()
})

test('button click fires event', () => {
  const onClick = jest.fn()
  const { getByText } = render(<button onClick={onClick}>Click me</button>)

  fireEvent.click(getByText('Click me'))
  expect(onClick).toHaveBeenCalled()
})
