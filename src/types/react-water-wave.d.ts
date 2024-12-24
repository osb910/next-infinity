declare module 'react-water-wave' {
  import type {ReactNode, CSSProperties} from 'react';

  interface WaterWaveRenderProps {
    pause: () => void;
    play: () => void;
    render: (width: number, height: number) => void;
    canvas: React.RefObject<HTMLCanvasElement>;
    // children: ReactNode;
  }

  interface WaterWaveProps {
    // Required props
    imageUrl: string;
    children: (props: WaterWaveRenderProps) => ReactNode;

    // Optional props
    dropRadius?: number;
    perturbance?: number;
    resolution?: number;
    interactive?: boolean;
    crossOrigin?: string;

    // Style props
    style?: CSSProperties;
    className?: string;
  }

  // Main component
  export default function WaterWave(props: WaterWaveProps): ReactNode;
  // (renderProps: WaterWaveRenderProps) => JSX.Element |
}
