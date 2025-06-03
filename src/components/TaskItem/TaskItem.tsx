import { memo } from 'react';
import type { TTask } from '../models';
import './TaskItem.css';

type TaskItemProps = {
  task: TTask;
  completeTask: (id: string) => void;
}

const TaskItem = ({ task, completeTask }: TaskItemProps) => {
  return (
    <li
      id={task.id}
      className='todos__task-item'
      onClick={() => completeTask(task.id)}
    >
      <div
        className={task.done
          ? 'todos__task-item-icon todos__task-item-icon--done'
          : 'todos__task-item-icon'}
      />
      <span
        className={task.done
          ? 'todos__task-item-name todos__task-item-name--done'
          : 'todos__task-item-name'}
      >
        {task.name}
      </span>
    </li>
  );
}

export default memo(TaskItem);