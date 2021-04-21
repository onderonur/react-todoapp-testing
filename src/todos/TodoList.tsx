import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Todo, TodoStatus } from './TodoTypes';

interface TodoListProps {
  todos: Todo[];
  onDone?: (todoId: number) => void;
  onDelete: (todoId: number) => void;
}

function TodoList({ todos, onDone, onDelete }: TodoListProps) {
  return (
    <ListGroup>
      {todos.map((todo) => (
        <ListGroupItem
          key={todo.id}
          data-testid={`todolist-item-${todo.id}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {todo.title}
          <div>
            {todo.status === TodoStatus.TO_DO && (
              <Button color="transparent" onClick={() => onDone?.(todo.id)}>
                ✅
              </Button>
            )}
            <Button color="transparent" onClick={() => onDelete(todo.id)}>
              ❌
            </Button>
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default TodoList;
