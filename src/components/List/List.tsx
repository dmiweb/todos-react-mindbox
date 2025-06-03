import { memo, type ReactNode } from 'react';
import './List.css';

const List = ({ children }: { children: ReactNode }) => {
  return (
    <ul className='todos__task-list'>
      {children}
    </ul>
  );
}

export default memo(List);