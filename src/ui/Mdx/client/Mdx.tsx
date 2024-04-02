import {serialize} from 'next-mdx-remote/serialize';
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote';
import {ReactNode} from 'react';

export interface MdxProps extends MDXRemoteProps {
  source: string;
  loader?: ReactNode;
}

const Mdx = async ({source, loader, ...delegated}: MdxProps) => {
  // @ts-ignore
  const Body = <MDXRemote {...source} {...delegated} />;
  return Body;
};

export default Mdx;
