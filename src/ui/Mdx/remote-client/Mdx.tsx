import {
  MDXRemote,
  // evaluate,
  type MDXRemoteProps,
} from 'next-mdx-remote-client/rsc';
import {Suspense, type ReactNode} from 'react';

export interface MdxProps extends MDXRemoteProps {
  source: string;
  loader?: ReactNode;
}

const ErrComponent = () => <div>Error rendering MDX content</div>;

// const {content, frontmatter, scope, error} = await evaluate<{title: string}>({
//     source,
//     options: {
//       parseFrontmatter: true,
//       scope: {
//         product: 'Server Components',
//       },
//     },
//   });
// if (error) {
//   return <ErrComponent error={error} />;
// }

const Mdx = ({source, loader, ...rest}: MdxProps) => {
  const Body = (
    <MDXRemote
      onError={ErrComponent}
      source={source}
      {...rest}
    />
  );
  return loader ? <Suspense fallback={loader}>{Body}</Suspense> : Body;
};

export default Mdx;
