import React, { useEffect } from 'react';
import { ListBosssQuery } from '../src/API';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { getBossesData } from '../lib/bosses';
import useLocalStorage from '../hooks/useLocalStorage';
import { createSessionId } from '../lib/bosses';

type Props = {
  bosses: ListBosssQuery['listBosss']['items'];
};

const ROUTE_BOSS_SLUG = '/[slug]';

const StartScreen = ({ bosses }: Props) => {
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

  return (
    <>
      <Head>
        <title>Big Boss Battle Trivia</title>
        <link rel='icon' href='/onslaught_hexagon.png' />
      </Head>
      <h2>BIG BOSS BATTLE TRIVIA</h2>
      <ul>
        {bosses.map(({ id, name, bossImgUrl, slug }) => (
          <li key={id}>
            {name}
            <Link
              href={{ pathname: ROUTE_BOSS_SLUG, query: { id } }}
              as={`/${slug}`}
            >
              <a>
                <Image
                  src={bossImgUrl}
                  height={250}
                  width={250}
                  layout={'intrinsic'}
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const bosses = await getBossesData();
  return {
    props: {
      bosses,
    },
  };
}

export default StartScreen;
