import { render, screen, within } from '@testing-library/react';
import TodoList from './TodoList';
import { TodoStatus } from './TodoTypes';

test('renders todos', () => {
  const todos = [
    { id: 1, title: 'Do some stuff', status: TodoStatus.TO_DO },
    { id: 2, title: 'Do other stuff', status: TodoStatus.DONE },
  ];

  render(<TodoList todos={todos} onDelete={jest.fn} />);

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(todos.length);

  listItems.forEach((listItem, i) => {
    const { getByText } = within(listItem);
    const todo = todos[i];
    expect(getByText(todo.title)).toBeInTheDocument();
    if (todo.status === TodoStatus.TO_DO) {
      const doneButton = getByText('✅');
      expect(doneButton).toBeInTheDocument();
    }
    const deleteButton = getByText('❌');
    expect(deleteButton).toBeInTheDocument();
  });
});
