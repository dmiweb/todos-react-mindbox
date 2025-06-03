import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';


describe('App Component', () => {

  it('renders app elements', () => {
    render(<App />);

    expect(screen.getByText('todos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText('0 items left')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'all' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'active' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'completed' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear completed' })).toBeInTheDocument();
  })

  it('adds new task correctly', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(form);

    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('1 items left')).toBeInTheDocument();
  })

  it('toggles task completion', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.submit(form);

    const taskElement = await screen.findByText('New Task');

    fireEvent.click(taskElement);

    expect(taskElement).toHaveClass('todos__task-item-name todos__task-item-name--done');
    expect(screen.getByText('0 items left')).toBeInTheDocument();
  })

  it('filters tasks correctly', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Active Task 1' } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: 'Active Task 2' } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: 'Completed Task' } });
    fireEvent.submit(form);

    const completedTask = await screen.findByText('Completed Task');
    fireEvent.click(completedTask);

    fireEvent.click(screen.getByRole('button', { name: 'active' }));
    expect(await screen.findByText('Active Task 1')).toBeInTheDocument();
    expect(await screen.findByText('Active Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'completed' }));
    expect(await screen.findByText('Completed Task')).toBeInTheDocument();
    expect(screen.queryByText('Active Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Active Task 2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'all' }));
    expect(await screen.findByText('Active Task 1')).toBeInTheDocument();
    expect(await screen.findByText('Active Task 2')).toBeInTheDocument();
    expect(await screen.findByText('Completed Task')).toBeInTheDocument();
  })

  it('clears completed tasks', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText('What needs to be done?');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'Active Task' } });
    fireEvent.submit(form);
    fireEvent.change(input, { target: { value: 'Completed Task' } });
    fireEvent.submit(form);

    const completedTask = await screen.findByText('Completed Task');
    fireEvent.click(completedTask);

    fireEvent.click(screen.getByRole('button', { name: 'Clear completed' }));

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryByText('Completed Task')).not.toBeInTheDocument();
  })
})