'use client';

import {useMemo} from 'react';
// @ts-ignore
import {withStyles, Appear, Link, Paragraph, Table, Words} from 'arwes';

import Clickable from '@/components/nasa-mission-control/Clickable';
import {ILaunch} from '@/services/nasa-mission-control/launch';

const styles = () => ({
  link: {
    color: 'red',
    textDecoration: 'none',
  },
});

interface UpcomingProps {
  entered: boolean;
  launches: Array<ILaunch>;
  classes: any;
  abortLaunch: (flightNumber: number) => void;
}

const Upcoming = ({entered, launches, classes, abortLaunch}: UpcomingProps) => {
  const tableBody = useMemo(() => {
    return launches
      ?.filter(launch => launch.upcoming)
      .map(launch => {
        return (
          <tr key={String(launch.flightNumber)}>
            <td>
              <Clickable style={{color: 'red'}}>
                <Link
                  className={classes.link}
                  onClick={() => abortLaunch(launch.flightNumber)}
                >
                  ✖
                </Link>
              </Clickable>
            </td>
            <td>{launch.flightNumber}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.target}</td>
          </tr>
        );
      });
  }, [launches, abortLaunch, classes.link]);

  return (
    <Appear id='upcoming' animate show={entered}>
      <Paragraph>
        Upcoming missions including both SpaceX launches and newly scheduled
        Zero to Mastery rockets.
      </Paragraph>
      <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>
      <Table animate show={entered}>
        <table style={{tableLayout: 'fixed'}}>
          <thead>
            <tr>
              <th style={{width: '3rem'}}></th>
              <th style={{width: '3rem'}}>No.</th>
              <th style={{width: '10rem'}}>Date</th>
              <th style={{width: '11rem'}}>Mission</th>
              <th style={{width: '11rem'}}>Rocket</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </Table>
    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
