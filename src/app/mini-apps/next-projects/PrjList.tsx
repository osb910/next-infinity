'use client';
import {ReactNode, DragEvent} from 'react';
import styles from './PrjList.module.css';
import {pluralize} from '@/utils/numbers';
import {XCircle} from 'react-feather';
import ky from 'ky';
import {getURL} from '@/utils/path';
import {IProject} from './Project.model';
import {motion} from 'framer-motion';
import {useToaster} from '@/ui/Toaster';
import Draggable from '@/components/Draggable/Draggable';
import Droppable from '@/components/Droppable/Droppable';

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
  const {createToast} = useToaster();

  const drop = async (data: string) => {
    const [projectType, prjId] = data.split(',');
    if (projectType === type) return;
    if (prjId) {
      try {
        const res = await ky.put(getURL(`/api/next-projects/${prjId}`), {
          json: {type},
          throwHttpErrors: false,
        });
        if (res.status !== 200) throw new Error('Failed to move project');
        console.log(res);
        moveProject(prjId, type);
      } catch (err) {
        if (!(err instanceof Error)) return;
        createToast('error', err.message, 20000);
        console.log(err);
      }
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await ky.delete(getURL(`/api/next-projects/${id}`), {
        throwHttpErrors: false,
      });
      if (res.status !== 200) throw new Error('Failed to delete project');
      console.log(res);
      removeProject(id);
    } catch (err) {
      if (!(err instanceof Error)) return;
      createToast('error', err.message, 20000);
      console.log(err);
    }
  };

  return (
    <Droppable
      as='section'
      drop={drop}
      className={`${styles.projects} ${styles[type]}`}
    >
      <header>
        <h2>{children}</h2>
      </header>
      <ul>
        {projects.length === 0 && <p>No projects yet!</p>}
        {projects.map(({_id, title, description, people}) => (
          <Draggable
            as='li'
            setDataTransfer={(evt: DragEvent) =>
              `${(evt.target as HTMLLIElement).dataset.type},${
                (evt.target as HTMLLIElement).id
              }`
            }
            id={_id?.toString()}
            data-type={type}
            key={`${_id?.toString()}`}
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
          </Draggable>
        ))}
      </ul>
    </Droppable>
  );
};

export default PrjList;
