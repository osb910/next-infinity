'use client';
import {useState, ReactNode, DragEvent} from 'react';
import styles from './PrjList.module.css';
import {pluralize} from '@/utils/numbers';
import {XCircle} from 'react-feather';
import ky from 'ky';
import {getURL} from '@/utils/path';
import {IProject} from './Project.model';
import Spinner from '@/components/Spinner/Spinner';

interface PrjListProps {
  type: 'active' | 'finished';
  projects: IProject[];
  children?: ReactNode;
  removeProject: (id: string) => void;
  moveProject: (id: string, type: 'active' | 'finished') => void;
}

const PrjList = ({
  type,
  projects,
  children,
  removeProject,
  moveProject,
}: PrjListProps) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dropping, setDropping] = useState<boolean>(false);
  const dragStartHandler = (evt: DragEvent) => {
    if (!(evt.target instanceof HTMLElement)) return;
    evt.dataTransfer.setData(
      'text/plain',
      `${evt.target.dataset.type},${evt.target.id}`
    );
    evt.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const dragEndHandler = (evt: DragEvent) => {
    setIsDragging(false);
  };

  const dragOverHandler = (evt: DragEvent) => {
    evt.dataTransfer?.types?.[0] === 'text/plain' && evt.preventDefault();
    setIsDraggedOver(true);
  };

  const dropHandler = async (evt: DragEvent) => {
    const [projectType, prjId] = evt.dataTransfer
      ?.getData('text/plain')
      .split(',');
    evt.preventDefault();
    setDropping(true);
    if (projectType === type) {
      setIsDraggedOver(false);
      setIsDragging(false);
      return;
    }
    if (prjId) {
      try {
        const res = await ky.put(getURL(`/api/next-projects/${prjId}`), {
          json: {type},
        });
        console.log(res);
        moveProject(prjId, type);
      } catch (err) {
        console.log(err);
      }
      setIsDraggedOver(false);
      setIsDragging(false);
      setDropping(false);
    }
  };

  const dragLeaveHandler = (_: DragEvent) => {
    setIsDraggedOver(false);
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await ky.delete(getURL(`/api/next-projects/${id}`));
      removeProject(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      className={`${styles.projects} ${styles[type]} ${
        isDraggedOver ? styles.droppable : ''
      }`}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      <header>
        <h2>{children}</h2>
      </header>
      {dropping && <Spinner />}
      <ul>
        {projects.length === 0 && <p>No projects yet!</p>}
        {projects.map(({_id, title, description, people}) => (
          <li
            id={_id?.toString()}
            data-type={type}
            key={`${_id?.toString()}-${dropping}`}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            className={isDragging ? styles.dragging : ''}
          >
            <h2>
              {title}{' '}
              <button
                type='button'
                onClick={() => deleteProject(_id!.toString())}
              >
                <XCircle />
              </button>
            </h2>
            <h3>{pluralize('person', people)} assigned</h3>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PrjList;
