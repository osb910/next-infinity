'use client';

import {useMemo} from 'react';
// @ts-ignore
import {Appear, Button, Loading, Paragraph} from 'arwes';
import Clickable from '@/components/nasa-mission-control/Clickable';
import {IPlanet} from '@/services/nasa-mission-control/planet';

interface LaunchProps {
  entered: boolean;
  planets: Array<IPlanet>;
  isPendingLaunch: boolean;
  submitLaunch: (e: any) => void;
}

const Launch = ({
  entered,
  planets,
  isPendingLaunch,
  submitLaunch,
}: LaunchProps) => {
  const selectorBody = useMemo(() => {
    return planets?.map(planet => (
      <option value={planet.keplerName} key={planet.keplerName}>
        {planet.keplerName}
      </option>
    ));
  }, [planets]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <Appear id='launch' animate show={entered}>
      <Paragraph>
        Schedule a mission launch for interstellar travel to one of the Kepler
        Exoplanets.
      </Paragraph>
      <Paragraph>
        Only confirmed planets matching the following criteria are available for
        the earliest scheduled missions:
      </Paragraph>
      <ul>
        <li>Planetary radius &lt; 1.6 times Earth&apos;s radius</li>
        <li>
          Effective stellar flux &gt; 0.36 times Earth&apos;s value and &lt;
          1.11 times Earth&apos;s value
        </li>
      </ul>

      <form
        onSubmit={submitLaunch}
        style={{
          display: 'inline-grid',
          gridTemplateColumns: 'auto auto',
          gridGap: '10px 20px',
        }}
      >
        <label htmlFor='launch-day'>Launch Date</label>
        <input
          type='date'
          id='launch-day'
          name='launch-day'
          min={today}
          max='2040-12-31'
          defaultValue={today}
        />
        <label htmlFor='mission-name'>Mission Name</label>
        <input type='text' id='mission-name' name='mission-name' />
        <label htmlFor='rocket-name'>Rocket Type</label>
        <input
          type='text'
          id='rocket-name'
          name='rocket-name'
          defaultValue='Explorer IS1'
        />
        <label htmlFor='planets-selector'>Destination Exoplanet</label>
        <select id='planets-selector' name='planets-selector'>
          {selectorBody}
        </select>
        <Clickable>
          <Button
            animate
            show={entered}
            type='submit'
            layer='success'
            disabled={isPendingLaunch}
          >
            Launch Mission ✔
          </Button>
        </Clickable>
        {isPendingLaunch && <Loading animate small />}
      </form>
    </Appear>
  );
};

export default Launch;