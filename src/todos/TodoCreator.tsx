import { useState } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Form,
  FormGroup,
} from 'reactstrap';
import { Todo, TodoStatus } from './TodoTypes';

interface TodoCreatorProps {
  onAdd: (todo: Todo) => void;
}

function TodoCreator({ onAdd }: TodoCreatorProps) {
  const [title, setTitle] = useState<string>('');

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const todo = {
          id: Date.now(),
          title,
          status: TodoStatus.TO_DO,
        };
        onAdd(todo);
        setTitle('');
      }}
    >
      <FormGroup>
        <InputGroup>
          <Input
            autoFocus={true}
            placeholder="Enter todo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button color="success" type="submit" disabled={!title}>
              Add
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Form>
  );
}

export default TodoCreator;
