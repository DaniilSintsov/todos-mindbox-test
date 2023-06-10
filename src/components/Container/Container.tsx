import TodoList from '../TodoList/TodoList';
import classes from './Container.module.css';

const Container = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Todos</h1>
      <TodoList />
    </div>
  );
};

export default Container;
