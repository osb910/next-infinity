import {MDXRemote, type MDXRemoteProps} from 'next-mdx-remote/rsc';
import {Suspense, type ReactNode} from 'react';

export interface MdxProps extends MDXRemoteProps {
  source: string;
  loader?: ReactNode;
}

const Mdx = ({source, loader, ...delegated}: MdxProps) => {
  try {
    const Body = (
      <MDXRemote
        source={source}
        {...delegated}
      />
    );
    return loader ? <Suspense fallback={loader}>{Body}</Suspense> : Body;
  } catch (err) {
    console.error('Error compiling or running MDX:', err);
    return <div>Error rendering MDX content</div>;
  }
};

export default Mdx;
