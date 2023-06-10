import { ITodo, TodoListFilter } from '../../types/todo.types';
import classes from './Toolbar.module.css';

interface IToolbarProps {
  todos: ITodo[];
  todoListFilter: TodoListFilter;
  setTodoListFilter: (todoListFilter: TodoListFilter) => void;
  clearCompletedHandler: () => void;
}

type ToolbarButton =
  | { text: 'All'; id: TodoListFilter.ALL }
  | { text: 'Active'; id: TodoListFilter.ACTIVE }
  | { text: 'Completed'; id: TodoListFilter.COMPLETED };

const Toolbar = ({
  todos,
  todoListFilter,
  clearCompletedHandler,
  setTodoListFilter
}: IToolbarProps) => {
  const leftTodosLength = todos.filter(todo => !todo.completed).length;

  const buttons: ToolbarButton[] = [
    { text: 'All', id: TodoListFilter.ALL },
    { text: 'Active', id: TodoListFilter.ACTIVE },
    { text: 'Completed', id: TodoListFilter.COMPLETED }
  ];

  return (
    <div className={classes.toolbar}>
      <p className={classes.textLeft}>{leftTodosLength} items left</p>
      <div className={classes.filter}>
        {buttons.map(button => (
          <button
            key={button.id}
            className={`${classes.button} ${
              button.id === todoListFilter ? classes.buttonActive : ''
            }`}
            onClick={() => setTodoListFilter(button.id)}>
            {button.text}
          </button>
        ))}
      </div>
      <button
        onClick={clearCompletedHandler}
        className={classes.button}>
        Clear completed
      </button>
    </div>
  );
};

export default Toolbar;
