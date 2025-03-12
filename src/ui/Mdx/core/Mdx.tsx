import {compile, run} from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import type {MDXProps} from 'mdx/types';

export interface MdxProps extends MDXProps {
  source: string;
}

const Mdx = async ({source, ...rest}: MdxProps) => {
  try {
    // Compile the MDX source code to a function body
    const code = String(await compile(source, {outputFormat: 'function-body'}));
    // You can then either run the code on the server, generating a server
    // component, or you can pass the string to a client component for
    // final rendering.

    // Run the compiled code with the runtime and get the default export
    // @ts-expect-error unknown
    const {default: MDXContent} = await run(code, {
      ...runtime,
      baseUrl: import.meta.url,
    });

    // Render the MDX content, supplying the ClientComponent as a component
    return <MDXContent {...rest} />;
  } catch (err) {
    console.error('Error compiling or running MDX:', err);
    return <div>Error rendering MDX content</div>;
  }
};

export default Mdx;
