import { useState, useEffect, useMemo } from 'react';
import FormAddTask from './components/FormAddTask/FormAddTask';
import List from './components/List/List';
import TaskItem from './components/TaskItem/TaskItem';
import ControlPanel from './components/ControlPanel/ControlPanel';
import type { TTask } from './components/models';
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [activeTasksCount, setActiveTasksCount] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  console.log(tasks)

  useEffect(() => {
    setActiveTasksCount(tasks.reduce((count, task) =>
      task.done === false ? count + 1 : count, 0));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    switch (selectedFilter) {
      case 'active':
        return tasks.filter(task => !task.done);
      case 'completed':
        return tasks.filter(task => task.done);
      default:
        return tasks;
    }
  }, [tasks, selectedFilter]);

  const addTask = (taskName: string) => {
    const newTask = {
      id: `${taskName}-${performance.now()}`,
      name: taskName,
      done: false,
    }

    setTasks((prev) => [...prev, newTask]);
  }

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      } else {
        return task;
      }
    }));
  }

  const applyFilter = (filter: string) => {
    setSelectedFilter(filter);
  }

  const clearCompletedTask = () => {
    const clearedTasks = tasks.filter(task => !task.done);

    setTasks(clearedTasks);
  }

  return (
    <div className='todos'>
      <h1 className='todos__title'>todos</h1>

      <div className='todos__container'>
        <FormAddTask addTask={addTask} />

        <List>
          {filteredTasks.map(task =>
            <TaskItem
              key={task.id}
              task={task}
              completeTask={completeTask}
            />).reverse()}
        </List>

        <ControlPanel
          activeTasksCount={activeTasksCount}
          selectedFilter={selectedFilter}
          applyFilter={applyFilter}
          clearCompletedTask={clearCompletedTask}
        />
      </div>

      <div className='todos__layer-decoration-one' />
      <div className='todos__layer-decoration-two' />
    </div>
  )
}

export default App;
