import React from "react";
import { ListBosssQuery, CreateSessionMutation } from "../src/API";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { getBossesData } from "../lib/bosses";

type Props = {
  bosses: ListBosssQuery["listBosss"]["items"];
  sessionId: CreateSessionMutation["createSession"]["id"];
};

const ROUTE_BOSS_SLUG = "/[slug]";

const StartScreen = ({ bosses, sessionId }: Props) => {
  return (
    <>
      <Head>
        <title>Big Boss Battle Trivia</title>
        <link rel="icon" href="/onslaught_hexagon.png" />
      </Head>
      <h2>BIG BOSS BATTLE TRIVIA</h2>
      <h3>Slay bosses, get loot</h3>
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
                  layout={"intrinsic"}
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
