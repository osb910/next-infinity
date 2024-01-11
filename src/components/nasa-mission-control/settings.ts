const resources = {
  background: {
    small: '/img/background-small.jpg',
    medium: '/img/background-medium.jpg',
    large: '/img/background-large.jpg',
  },
  pattern: '/img/glow.png',
};

const sounds = {
  shared: {
    volume: 0.5,
  },
  players: {
    click: {
      sound: {src: ['/sfx/click.mp3']},
      settings: {oneAtATime: true},
    },
    typing: {
      sound: {src: ['/sfx/typing.mp3']},
      settings: {oneAtATime: true},
    },
    deploy: {
      sound: {src: ['/sfx/deploy.mp3']},
      settings: {oneAtATime: true},
    },
    success: {
      sound: {
        src: ['/sfx/success.mp3'],
        volume: 0.2,
      },
      settings: {oneAtATime: true},
    },
    abort: {
      sound: {src: ['/sfx/abort.mp3']},
      settings: {oneAtATime: true},
    },
    warning: {
      sound: {src: ['/sfx/warning.mp3']},
      settings: {oneAtATime: true},
    },
  },
};

const theme = {
  color: {
    content: '#a1ecfb',
  },
  padding: 20,
  responsive: {
    small: 600,
    medium: 800,
    large: 1200,
  },
  typography: {
    headerFontFamily: '"Titillium Web", "sans-serif"',
  },
};

export {resources, sounds, theme};
