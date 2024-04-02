import {serialize} from 'next-mdx-remote/serialize';
import {MDXRemote, MDXRemoteProps} from 'next-mdx-remote';
import {ReactNode} from 'react';

export interface MdxProps extends MDXRemoteProps {
  source: string;
  loader?: ReactNode;
}

const Mdx = async ({source, loader, ...delegated}: MdxProps) => {
  const Body = <MDXRemote source={source} {...delegated} />;
  return loader ? <Suspense fallback={loader}>{Body}</Suspense> : Body;
};

export default Mdx;
