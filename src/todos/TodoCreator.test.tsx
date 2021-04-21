import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import TodoCreator from './TodoCreator';

test('add button is disabled when input is empty', () => {
  render(<TodoCreator onAdd={jest.fn} />);
  const input = screen.getByPlaceholderText('Enter todo title...');
  expect(input).toHaveValue('');
  const addButton = screen.getByText('Add');
  expect(addButton).toBeDisabled();
});

test('add button is enabled when input has value', () => {
  render(<TodoCreator onAdd={jest.fn} />);
  const input = screen.getByPlaceholderText('Enter todo title...');
  userEvent.type(input, 'Something');
  const addButton = screen.getByText('Add');
  expect(addButton).toBeEnabled();
});

test('is focused initially', () => {
  render(<TodoCreator onAdd={jest.fn} />);
  const input = screen.getByPlaceholderText('Enter todo title...');
  expect(input).toHaveFocus();
});

test('handles typing', () => {
  render(<TodoCreator onAdd={jest.fn} />);
  const input = screen.getByPlaceholderText('Enter todo title...');
  const inputValue = 'Do some stuff';
  userEvent.type(input, inputValue);
  expect(input).toHaveValue(inputValue);
});

test('clears value on add', () => {
  const handleAdd = jest.fn();
  render(<TodoCreator onAdd={handleAdd} />);
  const input = screen.getByPlaceholderText('Enter todo title...');
  userEvent.type(input, 'Do some stuff');
  const addButton = screen.getByText('Add');
  userEvent.click(addButton);
  expect(handleAdd).toBeCalled();
  expect(input).toHaveValue('');
});

test('submits on press enter', () => {
  const handleAdd = jest.fn();
  render(<TodoCreator onAdd={handleAdd} />);
  const input = screen.getByPlaceholderText('Enter todo title...');
  userEvent.type(input, 'Do some stuff{enter}');
  expect(handleAdd).toBeCalled();
});
