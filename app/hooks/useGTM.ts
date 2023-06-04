import { useEffect } from 'react';

function useGTM(title: string) {
  useEffect(() => {
    if (title) {
      (window as any).dataLayer.push({
        event: 'pageview',
        page: { title, path: window.location?.pathname }
      });
    }
  }, [title]);
}

export default useGTM;
