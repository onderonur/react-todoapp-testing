import { useState } from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import TodoCreator from '../todos/TodoCreator';
import TodoList from '../todos/TodoList';
import { Todo, TodoStatus } from '../todos/TodoTypes';

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [activeTab, setActiveTab] = useState<TodoStatus>(TodoStatus.TO_DO);

  function handleDelete(todoId: number) {
    setTodos((current) => current.filter((todo) => todo.id !== todoId));
  }

  return (
    <Container>
      <TodoCreator
        onAdd={(newTodo) => setTodos((current) => [...current, newTodo])}
      />
      <Nav tabs>
        <NavItem>
          <NavLink
            active={activeTab === TodoStatus.TO_DO}
            onClick={() => setActiveTab(TodoStatus.TO_DO)}
          >
            To Do
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={activeTab === TodoStatus.DONE}
            onClick={() => setActiveTab(TodoStatus.DONE)}
          >
            Done
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane
          tabId={TodoStatus.TO_DO}
          data-testid={`todos-tab-${TodoStatus.TO_DO}`}
        >
          <TodoList
            todos={todos.filter((todo) => todo.status === TodoStatus.TO_DO)}
            onDone={(todoId) =>
              setTodos((current) =>
                current.map((todo) =>
                  todo.id === todoId
                    ? { ...todo, status: TodoStatus.DONE }
                    : todo,
                ),
              )
            }
            onDelete={handleDelete}
          />
        </TabPane>
        <TabPane
          tabId={TodoStatus.DONE}
          data-testid={`todos-tab-${TodoStatus.DONE}`}
        >
          <TodoList
            todos={todos.filter((todo) => todo.status === TodoStatus.DONE)}
            onDelete={handleDelete}
          />
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default Todos;
