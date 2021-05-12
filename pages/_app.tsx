import type { AppProps /*, AppContext */ } from 'next/app';
import { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { createSessionId } from '../lib/bosses';

function MyApp({ Component, pageProps }: AppProps) {
  const [sessionId, setSessionId] = useLocalStorage<string>('sessionId', null);
  console.log('sessionId: ', sessionId);

  useEffect(() => {
    async function setupSession(session: string | null) {
      if (!session) {
        const sessionId = await createSessionId();
        if (!sessionId) {
          console.warn(
            'Could not fetch a sessionId! May see repeat questions.'
          );
          return;
        }
        console.log('fetched sessionId: ', sessionId);
        setSessionId(sessionId);
      }
    }
    setupSession(sessionId);
  }, []);
  return <Component sessionId={sessionId} {...pageProps} />;
}

export default MyApp;
