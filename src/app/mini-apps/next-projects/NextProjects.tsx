'use client';

import useSWR from 'swr';

import {useCallback} from 'react';
import Header from '@/components/Header/Header';
import styles from './NextProjects.module.css';
import ProjectInput from './ProjectInput';
import PrjList from './PrjList';
import {getURL} from '@/utils/path';
import Spinner from '@/components/Spinner/Spinner';
import {IProject} from './Project.model';

export interface Draggable {
  dragStartHandler: (evt: DragEvent) => void;
  dragEndHandler: (evt: DragEvent) => void;
}

export interface DragTarget {
  dragOverHandler: (evt: DragEvent) => void;
  dropHandler: (evt: DragEvent) => void;
  dragLeaveHandler: (evt: DragEvent) => void;
}

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const DragNDrop = () => {
  const {data, error, isLoading, mutate} = useSWR(
    getURL('/api/next-projects'),
    fetcher
  );

  const addProject = useCallback(
    (project: IProject) => mutate([...data, project]),
    [data, mutate]
  );

  const removeProject = useCallback(
    (id: string) =>
      mutate(
        data.filter((project: IProject) => project._id?.toString() !== id)
      ),
    [data, mutate]
  );

  const moveProject = useCallback(
    (id: string, type: 'active' | 'finished') =>
      mutate(
        data.map((project: IProject) =>
          project._id?.toString() === id ? {...project, type} : project
        )
      ),
    [data, mutate]
  );

  return (
    <>
      <Header>
        <h1>Drag N Drop</h1>
      </Header>
      <main className={styles.main}>
        <ProjectInput addProject={addProject} />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <PrjList
              type='active'
              projects={data?.filter(
                (project: IProject) => project.type === 'active'
              )}
              removeProject={removeProject}
              moveProject={moveProject}
            >
              Active Projects
            </PrjList>
            <PrjList
              type='finished'
              projects={data?.filter(
                (project: IProject) => project.type === 'finished'
              )}
              removeProject={removeProject}
              moveProject={moveProject}
            >
              Finished Projects
            </PrjList>
          </>
        )}
      </main>
    </>
  );
};

export default DragNDrop;
