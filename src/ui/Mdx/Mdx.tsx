import {MDXRemote, type MDXRemoteProps} from 'next-mdx-remote/rsc';
import {Suspense, type ReactNode} from 'react';

export interface MdxProps extends MDXRemoteProps {
  source: string;
  loader?: ReactNode;
}

const Mdx = async ({source, loader, ...delegated}: MdxProps) => {
  const Body = <MDXRemote source={source} {...delegated} />;
  return loader ? <Suspense fallback={loader}>{Body}</Suspense> : Body;
};

export default Mdx;
