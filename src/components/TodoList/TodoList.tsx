import { useState } from 'react';
import Form from '../Form/Form';
import classes from './TodoList.module.css';
import Todo from '../Todo/Todo';
import { ITodo, TodoListFilter } from '../../types/todo.types';
import Toolbar from '../Toolbar/Toolbar';

const TodoList = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todoListFilter, setTodoListFilter] = useState<TodoListFilter>(
    TodoListFilter.ALL
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim().length) {
      return;
    }
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: value.trim(),
        completed: false
      }
    ]);
    setValue('');
  };

  const todoClickHandler = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  };

  const clearCompletedHandler = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className={classes.list}>
      <Form
        placeholder="What needs to be done?"
        value={value}
        setValue={setValue}
        onSubmit={submitHandler}
      />
      {todos.length ? (
        <>
          {todoListFilter === TodoListFilter.ALL && (
            <div className={classes.list}>
              {todos.map(todo => (
                <Todo
                  onClick={todoClickHandler}
                  key={todo.id}
                  todo={todo}
                />
              ))}
            </div>
          )}
          {todoListFilter === TodoListFilter.ACTIVE && (
            <div className={classes.list}>
              {todos
                .filter(todo => !todo.completed)
                .map(todo => (
                  <Todo
                    onClick={todoClickHandler}
                    key={todo.id}
                    todo={todo}
                  />
                ))}
            </div>
          )}
          {todoListFilter === TodoListFilter.COMPLETED && (
            <div className={classes.list}>
              {todos
                .filter(todo => todo.completed)
                .map(todo => (
                  <Todo
                    onClick={todoClickHandler}
                    key={todo.id}
                    todo={todo}
                  />
                ))}
            </div>
          )}
        </>
      ) : (
        <div className={classes.empty}>No todos</div>
      )}
      <Toolbar
        todos={todos}
        todoListFilter={todoListFilter}
        setTodoListFilter={setTodoListFilter}
        clearCompletedHandler={clearCompletedHandler}
      />
    </div>
  );
};

export default TodoList;
