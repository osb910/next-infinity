import React from 'react';
import {BrightProps, Code} from 'bright';

import theme from './theme';
import styles from './CodeSnippet.module.css';

function CodeSnippet(props: BrightProps) {
  return <Code  {...props} theme={theme} className={styles.wrapper} />;
}

export default CodeSnippet;
