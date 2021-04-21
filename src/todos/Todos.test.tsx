import { render, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todos from './Todos';
import { TodoStatus } from './TodoTypes';

interface TodoInput {
  title: string;
}

const prepareTodos = (): TodoInput[] => {
  render(<Todos />);
  const input = screen.getByPlaceholderText('Enter todo title...');
  const addButton = screen.getByText('Add');

  const todos: TodoInput[] = [
    { title: 'Todo #1' },
    { title: 'Todo #2' },
    { title: 'Todo #3' },
  ];

  todos.forEach((todo) => {
    userEvent.type(input, todo.title);
    userEvent.click(addButton);
  });

  return todos;
};

test('todo tab is active initially', () => {
  const { getByTestId } = render(<Todos />);
  Object.values(TodoStatus).forEach((status) => {
    const todoTab = getByTestId(`todos-tab-${status}`);
    if (status === TodoStatus.TO_DO) {
      expect(todoTab).toHaveClass('active');
    } else {
      expect(todoTab).not.toHaveClass('active');
    }
  });
});

test('handles tab navigation', () => {
  const { getByText, getByTestId } = render(<Todos />);

  const tabNavigationOrder = [TodoStatus.DONE, TodoStatus.TO_DO];

  tabNavigationOrder.forEach((status) => {
    const tabNav = getByText(status);
    userEvent.click(tabNav);
    const tab = getByTestId(`todos-tab-${status}`);
    expect(tab).toHaveClass('active');
  });
});

test('adds todos', () => {
  const todos = prepareTodos();
  const listItems = screen.getAllByTestId(/todolist-item-/);
  expect(listItems).toHaveLength(todos.length);
});

test('deletes todo', () => {
  const todos = prepareTodos();
  const listItems = screen.getAllByTestId(/todolist-item-/);
  const listItem = listItems[0];

  const withinListItem = within(listItem);
  const deleteButton = withinListItem.getByText('❌');
  userEvent.click(deleteButton);

  const remainingListItems = screen.getAllByTestId(/todolist-item-/);
  expect(remainingListItems).toHaveLength(todos.length - 1);
  expect(listItem).not.toBeInTheDocument();
});

test('makes todos done', () => {
  const todos = prepareTodos();
  const listItems = screen.getAllByTestId(/todolist-item-/);
  listItems.forEach((listItem) => {
    const withinListItem = within(listItem);
    const doneButton = withinListItem.getByText('✅');
    userEvent.click(doneButton);
    expect(listItem).not.toBeVisible();
  });
  const doneTabNav = screen.getByText('Done');
  userEvent.click(doneTabNav);
  const doneListItems = screen.getAllByTestId(/todolist-item-/);
  expect(doneListItems).toHaveLength(todos.length);
});

test('can delete todos with done status', () => {
  prepareTodos();
  const listItems = screen.getAllByTestId(/todolist-item-/);
  const listItem = listItems[0];
  const withinListItem = within(listItem);
  const doneButton = withinListItem.getByText('✅');
  userEvent.click(doneButton);
  const doneTabNav = screen.getByText('Done');
  userEvent.click(doneTabNav);
  const deleteButton = withinListItem.getByText('❌');
  userEvent.click(deleteButton);
  expect(listItem).not.toBeInTheDocument();
});
