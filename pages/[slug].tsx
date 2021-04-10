import Link from 'next/link';
import React, { useEffect } from 'react';
import { getBossData, getBossSlugs, getBossQuestions } from '../lib/bosses';
import { useRouter } from 'next/router';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

export default function Boss({
  bossData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(bossData);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getBossQuestions(bossData.id);
      console.log(questions);
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <Head>
        <title>Big Boss Battle Trivia: {bossData.name}</title>
        <link rel='icon' href='/onslaught_hexagon.png' />
      </Head>
      <Link href='/'>
        <a>Home</a>
      </Link>{' '}
      <h1>{bossData.name}</h1>
      <Image
        src={bossData.bossImgUrl}
        height={300}
        width={300}
        layout={'intrinsic'}
      />
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const bossData = await getBossData(context.params.slug);
  return {
    props: {
      bossData,
    },
  };
}
