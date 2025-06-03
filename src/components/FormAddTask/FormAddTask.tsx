import { memo, useState } from 'react';
import './FormAddTask.css';

type FormAddTaskProps = {
  addTask: (taskName: string) => void;
}

const FormAddTask = ({ addTask }: FormAddTaskProps) => {
  const [taskName, setTaskName] = useState<string>('');

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (taskName.trim()) {
      addTask(taskName);
      setTaskName('');
    };
  }

  return (
    <form className='todos__form' onSubmit={onSubmitForm}>
      <input
        type="text"
        name="task-name"
        className='todos__input'
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder='What needs to be done?'
        required
      />
    </form>
  );
}

export default memo(FormAddTask);