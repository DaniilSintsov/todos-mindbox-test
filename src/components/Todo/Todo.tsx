import { ITodo } from '../../types/todo.types';
import Checkbox from '../Checkbox/Checkbox';
import classes from './Todo.module.css';

interface ITodoProps {
  todo: ITodo;
  onClick: (id: number) => void;
}

const Todo = ({ todo, onClick }: ITodoProps) => {
  return (
    <div className={classes.todo}>
      <Checkbox
        onClick={() => onClick(todo.id)}
        completed={todo.completed}
      />
      <p
        className={`${classes.text} ${
          todo.completed ? classes.textCompleted : ''
        }`}>
        {todo.text}
      </p>
    </div>
  );
};

export default Todo;
