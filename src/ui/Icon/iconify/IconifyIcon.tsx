'use client';

import {Icon, type IconProps} from '@iconify/react';

export type IconifyIconProps = IconProps & {};

const IconifyIcon = ({icon, ...rest}: IconifyIconProps) => {
  return <Icon icon={icon} style={{flexShrink: 0}} {...rest} />;
};

export default IconifyIcon;
