import Link from 'next/link';
import React from 'react';
import { getBossData, getBossSlugs } from '../lib/bosses';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Boss({ bossData }) {
  console.log(bossData);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Deathwing cometh</title>
        <link rel='icon' href='/onslaught_hexagon.png' />
      </Head>
      <Link href='/'>
        <a>Home</a>
      </Link>{' '}
      Boss Name Goes Here
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getBossSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const bossData = await getBossData(params.slug);
  return {
    props: {
      bossData,
    },
  };
}
