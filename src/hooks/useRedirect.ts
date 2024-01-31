import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const useRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setUrl = (
    params: [string, string][],
    {
      reload = false,
      noReplace = false,
    }: {
      reload?: boolean;
      noReplace?: boolean;
    } = {}
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (noReplace && params.some(([key]) => current.has(key))) return;
    params.forEach(([key, value]) => {
      current.set(key, value);
    });
    const search = current.toString();
    router.push(`${pathname}${search ? `?${search}` : ''}`);
    router.refresh();
    if (reload && params.every(([key]) => current.has(key))) {
      location.href = `${pathname}${search ? `?${search}` : ''}`;
    }
  };
  return {setUrl};
};

export default useRedirect;
