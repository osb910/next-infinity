'use client';
import {useState, ReactNode, DragEvent} from 'react';
import styles from './Droppable.module.css';
import Spinner from '../Spinner/Spinner';

interface DroppableProps {
  as?: string;
  children?: ReactNode;
  className?: string;
  drop: (data: string) => void;
  [idx: string]: any;
}

const Droppable = ({
  as = 'div',
  children,
  className,
  drop,
  ...delegated
}: DroppableProps) => {
  const Component = as as keyof JSX.IntrinsicElements;
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [dropping, setDropping] = useState<boolean>(false);

  const dragOverHandler = (evt: DragEvent) => {
    evt.dataTransfer?.types?.[0] === 'text/plain' && evt.preventDefault();
    setIsDraggedOver(true);
  };

  const dropHandler = async (evt: DragEvent) => {
    const data = evt.dataTransfer?.getData('text/plain');
    evt.preventDefault();
    setDropping(true);
    await drop(data);
    setIsDraggedOver(false);
    setDropping(false);
  };

  const dragLeaveHandler = (_: DragEvent) => {
    setIsDraggedOver(false);
  };

  return (
    <Component
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
      {...delegated}
      className={`${isDraggedOver ? styles.droppable : ''} ${className ?? ''}`}
    >
      {children}
      {dropping && <Spinner />}
    </Component>
  );
};

export default Droppable;
