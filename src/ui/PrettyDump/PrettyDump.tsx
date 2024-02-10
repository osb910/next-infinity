import {prettyPrintJson} from 'pretty-print-json';
import '@/../pretty-print-json/dist/css/pretty-print-json.css';

interface PrettyDumpProps {
  data: any;
}

export const PrettyDump = ({data}: PrettyDumpProps) => {
  return (
    <pre
      className='json-container'
      dangerouslySetInnerHTML={{
        __html: prettyPrintJson.toHtml(data, {indent: 2}),
      }}
    ></pre>
  );
};

export default PrettyDump;
