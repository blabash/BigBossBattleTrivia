import Link from 'next/link';
import React from 'react';
import { getBossData, getBossSlugs } from '../lib/bosses';

export default function Boss() {
  return (
    <div>
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

export async function getStaticProps(ctx) {
  console.log('ctx ', ctx);
  const bossData = await getBossData(ctx.params.slug);
  return {
    props: {
      bossData,
    },
  };
}
