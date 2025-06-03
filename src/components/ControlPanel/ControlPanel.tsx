import { memo } from 'react';
import './ControlPanel.css';

type ControlPanelProps = {
  activeTasksCount: number;
  selectedFilter: string;
  applyFilter: (filter: string) => void;
  clearCompletedTask: () => void;
}

const ControlPanel = ({
  activeTasksCount,
  selectedFilter,
  applyFilter,
  clearCompletedTask
}: ControlPanelProps) => {
  const filters = ['all', 'active', 'completed']
  return (
    <div className='todos__control-panel'>
      <div className='todos__tasks-left'>{activeTasksCount} items left</div>

      <div className='todos__filter-tastks'>
        {filters.map((filter, index) =>
          <button
            key={index}
            className={selectedFilter === filter
              ? "todos__filter-option-btn todos__filter-option-btn--active"
              : "todos__filter-option-btn"}
            onClick={() => applyFilter(filter)}
          >
            {filter}
          </button>
        )}
      </div>

      <button
        className='todos__clear-tasks-completed-btn'
        onClick={clearCompletedTask}
      >
        Clear completed
      </button>
    </div>
  );
}

export default memo(ControlPanel);