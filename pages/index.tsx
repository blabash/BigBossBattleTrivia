import * as React from "react";
import {ListBosssQuery} from '../src/API'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import {getBosss} from '../lib/bosses'

type Props = {
  bosses: ListBosssQuery["listBosss"]["items"]
}

const StartScreen = ({bosses}: Props) => {
  return (
    <>
      <Head>
        <title>Big Boss Battle Trivia</title>
        <link rel="icon" href="/onslaught_hexagon.png"/>
      </Head>
      <h2>BIG BOSS BATTLE TRIVIA</h2>
      <ul>
        {bosses.map(({id, name, bossImgUrl, slug}) => (
          <li key={id}>
            {name}
            <Link href={`/${slug}`}>
              <a>
                <Image src={bossImgUrl} height={250} width={250} layout={'intrinsic'}/>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const bosses = await getBosss()
  console.log(bosses)
  return {
    props: {
      bosses
    }
  }
}

export default StartScreen;