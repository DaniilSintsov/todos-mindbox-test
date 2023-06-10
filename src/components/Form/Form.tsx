import classes from './Form.module.css';

interface IFormProps {
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ value, setValue, placeholder, onSubmit }: IFormProps) => {
  return (
    <form
      role="form"
      onSubmit={onSubmit}
      className={classes.form}>
      <input
        className={classes.input}
        placeholder={placeholder}
        type="text"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <button className={classes.btn}>Add</button>
    </form>
  );
};

export default Form;
