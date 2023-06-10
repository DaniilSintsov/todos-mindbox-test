import { describe, expect, test } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList component', () => {
  test('submitting a form with an empty input does not add a new todo item', () => {
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <TodoList />
    );

    const input = getByPlaceholderText('What needs to be done?');
    const form = getByRole('form');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(form);

    expect(queryByText(/No todos/)).toBeInTheDocument();
  });

  test('submitting a form with a non-empty input adds a new todo item to the list', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<TodoList />);

    const input = getByPlaceholderText('What needs to be done?');
    const form = getByRole('form');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.submit(form);

    expect(getByText(/New todo/)).toBeInTheDocument();
  });

  test('clicking on a todo item toggles its completed status', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<TodoList />);

    const input = getByPlaceholderText('What needs to be done?');
    const form = getByRole('form');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.submit(form);

    const todoItem = getByText(/New todo/).previousSibling as HTMLElement;

    fireEvent.click(todoItem);

    expect(todoItem).toHaveClass('completed');
  });

  test('clicking on the clear completed button removes all completed items from the list', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<TodoList />);

    const input = getByPlaceholderText('What needs to be done?');
    const form = getByRole('form');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.submit(form);

    const todoItem = getByText(/New todo/).previousSibling as HTMLElement;
    fireEvent.click(todoItem);

    const clearCompletedButton = getByText(/Clear completed/);
    fireEvent.click(clearCompletedButton);

    expect(getByText(/No todos/)).toBeInTheDocument();
  });

  test('filtering the list by completed shows only completed items', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<TodoList />);

    const input = getByPlaceholderText('What needs to be done?');
    const form = getByRole('form');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.submit(form);

    const todoItem = getByText(/New todo/).previousSibling as HTMLElement;
    fireEvent.click(todoItem);

    const completedFilter = getByText(/Completed/);
    fireEvent.click(completedFilter);

    expect(getByText(/New todo/).previousSibling).toHaveClass('completed');
  });

  test('filtering the list by active shows only active items', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<TodoList />);

    const input = getByPlaceholderText('What needs to be done?');
    const form = getByRole('form');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.submit(form);

    const todoItem = getByText(/New todo/).previousSibling as HTMLElement;
    fireEvent.click(todoItem);

    const activeFilter = getByText(/Active/);
    fireEvent.click(activeFilter);

    expect(todoItem).not.toBeInTheDocument();
  });

  test('filtering the list by all shows all items, completed and active included', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<TodoList />);

    const input = getByPlaceholderText('What needs to be done?');
    const form = getByRole('form');

    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.submit(form);

    const todoItem = getByText(/New todo/).previousSibling as HTMLElement;
    fireEvent.click(todoItem);

    const allFilter = getByText(/All/);
    fireEvent.click(allFilter);

    expect(getByText(/New todo/)).toBeInTheDocument();
  });
});
