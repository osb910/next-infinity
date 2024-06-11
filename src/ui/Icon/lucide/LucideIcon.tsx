import {type LucideProps} from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

export interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}
const Icon = ({name, ...rest}: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  return <LucideIcon style={{flexShrink: 0}} {...rest} />;
};

export default Icon;
