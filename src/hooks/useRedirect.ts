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
    if (
      (noReplace && params.some(([k]) => current.has(k))) ||
      params.every(([k, v]) => current.get(k) === v)
    )
      return;
    params.forEach(([k, v]) => {
      current.set(k, v);
    });
    const search = current.toString();
    router.push(`${pathname}${search ? `?${search}` : ''}`);
    router.refresh();
    if (reload && params.every(([k]) => current.has(k))) {
      location.href = `${pathname}${search ? `?${search}` : ''}`;
    }
  };
  return {setUrl};
};

export default useRedirect;
