import StoreEditor from '@/components/next-stores/StoreEditor';
import {type Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Add Store',
  description: 'Add new store',
};

const AddStore = async () => {
  return <StoreEditor />;
};

export default AddStore;
