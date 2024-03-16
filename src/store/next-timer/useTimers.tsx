'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';

type Status = 'running' | 'paused' | 'stopped';

export interface Timer {
  name: string;
  duration: number;
  status: Status;
}

export interface TimersState {
  isRunning: boolean;
  timers: Array<Timer>;
}

export interface TimersCtx extends TimersState {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
  toggleTimers: () => void;
  changeStatus: (name: string, status: Status) => void;
}

type TimersProviderProps = {
  children: ReactNode;
};

const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

type Action =
  | {
      type: 'add';
      payload: Timer;
    }
  | {
      type: 'start' | 'stop';
      payload?: never;
    }
  | {
      type: 'change-status';
      payload: {
        name: string;
        status: Status;
      };
    };

const timersReducer = (state: TimersState, action: Action): TimersState => {
  const actions = {
    add: () => ({
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload!.name,
          duration: (action.payload as Timer).duration,
          status: action.payload!.status,
        },
      ],
    }),
    start: () => ({
      ...state,
      timers: state.timers.map(timer => ({
        ...timer,
        status: 'running',
      })),
      isRunning: true,
    }),
    stop: () => ({
      ...state,
      timers: state.timers.map(timer => ({
        ...timer,
        // status: 'stopped',
      })),
      isRunning: false,
    }),
    'change-status': () => ({
      ...state,
      timers: state.timers.map(timer =>
        timer.name === action.payload!.name
          ? {...timer, status: action.payload!.status}
          : timer
      ),
    }),
    '': () => state,
  };
  // @ts-ignore
  return actions[action.type]();
};

const TimersContext = createContext<TimersCtx | null>(null);

export const TimersProvider = ({children}: TimersProviderProps) => {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);
  const addTimer = useCallback((timerData: Timer) => {
    dispatch({type: 'add', payload: timerData});
  }, []);

  const startTimers = useCallback(() => {
    dispatch({type: 'start'});
  }, []);

  const stopTimers = useCallback(() => {
    dispatch({type: 'stop'});
  }, []);

  const toggleTimers = useCallback(() => {
    dispatch({type: timersState.isRunning ? 'stop' : 'start'});
  }, [timersState.isRunning]);

  const changeStatus = useCallback((name: string, status: Status) => {
    dispatch({type: 'change-status', payload: {name, status}});
  }, []);

  useEffect(() => {
    if (timersState.timers.every(t => t.status === 'stopped')) {
      stopTimers();
    }
  }, [timersState.timers, stopTimers]);

  const ctx: TimersCtx = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer,
    startTimers,
    stopTimers,
    toggleTimers,
    changeStatus,
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
};

const useTimers = () => {
  const data = useContext(TimersContext);
  if (!data)
    throw new Error('Cannot consume Timers context without a TimersProvider');

  return data;
};

export default useTimers;
