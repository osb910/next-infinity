'use client';
// @ts-ignore
import {Logo, Words, Header as ArwesHeader, Highlight, withStyles} from 'arwes';
import {Link} from 'react-router-dom';
import Image from 'next/image';
import Clickable from './Clickable';
import Centered from './Centered';
import {ComponentProps} from 'react';

const styles = (theme: any) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    lineHeight: '80px',
  },
  logo: {
    display: 'inherit',
    marginTop: '15px',
  },
  nav: {
    display: 'inherit',
  },
  banner: {
    display: 'inherit',
    fontWeight: 'bold',
    marginLeft: '10px',
    marginRight: '15px',
    fontSize: 28,
  },
  clickable: {
    fontSize: 21,
    '& i': {
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  link: {
    color: theme.color.content,
    textDecoration: 'none',
  },
  button: {
    padding: [0, theme.padding / 2],
  },
  '@media (max-width: 800px)': {
    logo: {
      display: 'none',
    },
    img: {
      display: 'none',
    },
    banner: {
      display: 'none',
    },
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    },
  },
});

interface HeaderProps extends ComponentProps<'div'> {
  onNav: () => void;
  classes: any;
}

const Header = ({classes, onNav, ...rest}: HeaderProps) => {
  return (
    <ArwesHeader animate>
      <Centered className={classes.root} {...rest}>
        <Image
          width={100}
          height={100}
          src='/img/nasa-mission-control/favicon.png'
          alt=''
          className={classes.img}
          style={{
            margin: '15px 10px 15px 0',
            height: '50px',
            width: 'auto',
          }}
        />
        <Logo animate size={50} className={classes.logo} layer='header' />
        <Words animate className={classes.banner}>
          NASA Mission Control
        </Words>
        <nav className={`${classes.nav}`}>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer='header'>
              <Link className={classes.link} to='/nasa-mission-control/launch'>
                <i className='material-icons'>check_circle_outline</i>Launch
              </Link>
            </Highlight>
          </Clickable>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer='header'>
              <Link
                className={classes.link}
                to='/nasa-mission-control/upcoming'
              >
                <i className='material-icons'>update</i>Upcoming
              </Link>
            </Highlight>
          </Clickable>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer='header'>
              <Link className={classes.link} to='/nasa-mission-control/history'>
                <i className='material-icons'>history</i>History
              </Link>
            </Highlight>
          </Clickable>
        </nav>
      </Centered>
    </ArwesHeader>
  );
};

export default withStyles(styles)(Header);
