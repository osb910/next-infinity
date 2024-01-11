'use client';
import {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
// @ts-ignore
import {Frame, withSounds, withStyles} from 'arwes';
import Centered from '@/components/nasa-mission-control/Centered';
import Header from '@/components/nasa-mission-control/Header';
import Footer from '@/components/nasa-mission-control/Footer';
import useLaunches from '../useLaunches';
import usePlanets from '../usePlanets';
import Launch from './Launch';
import Upcoming from './Upcoming';
import History from './History';
import {IPlanet} from '@/services/nasa-mission-control/planet';

const styles = () => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 'auto',
  },
  centered: {
    flex: 1,
    paddingTop: '20px',
    paddingBottom: '10px',
  },
});

interface HomeProps {
  sounds: any;
  classes: any;
}
const Home = ({sounds, classes}: HomeProps) => {
  const [frameVisible, setFrameVisible] = useState(true);
  const animateFrame = () => {
    setFrameVisible(false);
    setTimeout(() => {
      setFrameVisible(true);
    }, 600);
  };

  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();

  const {launches, isPendingLaunch, submitLaunch, abortLaunch} = useLaunches(
    onSuccessSound,
    onAbortSound,
    onFailureSound
  );

  const planets = usePlanets();
  return (
    <div className={classes.content}>
      <Header onNav={animateFrame} />
      <Centered className={classes.centered}>
        <Frame
          animate
          show={frameVisible}
          corners={4}
          style={{visibility: frameVisible ? 'visible' : 'hidden'}}
        >
          {(anim: any) => (
            <div style={{padding: '20px'}}>
              <Switch>
                <Route exact path='/'>
                  <Launch
                    entered={anim.entered}
                    planets={planets}
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                </Route>
                <Route exact path='/nasa-mission-control/launch'>
                  <Launch
                    entered={anim.entered}
                    planets={planets}
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                </Route>
                <Route exact path='/nasa-mission-control/upcoming'>
                  <Upcoming
                    entered={anim.entered}
                    launches={launches}
                    abortLaunch={abortLaunch}
                  />
                </Route>
                <Route exact path='/nasa-mission-control/history'>
                  <History entered={anim.entered} launches={launches} />
                </Route>
              </Switch>
            </div>
          )}
        </Frame>
      </Centered>
      <Footer />
    </div>
  );
};

export default withSounds()(withStyles(styles)(Home));
