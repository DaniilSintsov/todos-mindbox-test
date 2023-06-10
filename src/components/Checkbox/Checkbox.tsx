import classes from './Checkbox.module.css';

interface ICheckboxProps {
  completed: boolean;
  onClick: () => void;
}

const Checkbox = ({ completed, onClick }: ICheckboxProps) => {
  return (
    <div
      onClick={onClick}
      className={`${classes.checkbox} ${
        completed ? classes.checked + ' completed' : classes.notChecked
      }`}></div>
  );
};

export default Checkbox;
