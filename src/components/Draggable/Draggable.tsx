'use client';

import {useState, ReactNode, DragEvent} from 'react';
import styles from './Draggable.module.css';
interface DraggableProps {
  as?: string;
  children?: ReactNode;
  className?: string;
  setDataTransfer?: (evt: DragEvent) => string;
  [idx: string]: any;
}
const Draggable = ({
  as = 'div',
  children,
  className,
  setDataTransfer,
  ...delegated
}: DraggableProps) => {
  const Component = as as keyof HTMLElementTagNameMap;
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragStartHandler = (evt: DragEvent) => {
    if (!(evt.target instanceof HTMLElement)) return;
    evt.dataTransfer.setData(
      'text/plain',
      setDataTransfer?.(evt) ?? `${evt.target.id}`
    );
    evt.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const dragEndHandler = () => {
    setIsDragging(false);
  };

  return (
    <Component
      draggable
      onDragStart={(evt) => dragStartHandler(evt)}
      onDragEnd={() => dragEndHandler()}
      {...delegated}
      className={`${styles.draggable} ${isDragging ? styles.dragging : ''} ${
        className ?? ''
      }`}
    >
      {children}
    </Component>
  );
};

export default Draggable;
