'use client';

import ErrorAlert from '@/components/ErrorAlert';
import Home from '@/components/nasa-mission-control/pages/Home';
// import {BrowserRouter as Router} from 'react-router-dom';
// import {
//   Arwes,
//   SoundsProvider,
//   ThemeProvider,
//   createSounds,
//   createTheme,
//   // @ts-ignore
// } from 'arwes';
// import {
//   theme,
//   resources,
//   sounds,
// } from '@/components/nasa-mission-control/settings';

const HomePage = () => {
  try {
    return (
      <h1>Frontend Coming Soon</h1>
      // <ThemeProvider theme={createTheme(theme)}>
      //   <SoundsProvider sounds={createSounds(sounds)}>
      //     <Arwes
      //       animate
      //       background={resources.background.large}
      //       pattern={resources.pattern}
      //     >
      //       {(anim: any) => (
      //         <Router>
      // {/* </Router>
      // )}
      // </Arwes>
      // </SoundsProvider>
      // </ThemeProvider> */}
      // <Home
      // show={anim.entered}
      // />
    );
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
    return <ErrorAlert>{err.message}</ErrorAlert>;
  }
};

export default HomePage;
