import * as React from "react";
import API, { graphqlOperation } from "@aws-amplify/api-graphql";
import {ListLevelsQuery} from '../src/API'
import awsExports from '../src/aws-exports'
import { listLevels } from "../src/graphql/queries";
import Image from 'next/image'
import Head from 'next/head'
API.configure(awsExports)

type Props = {
  levels: ListLevelsQuery["listLevels"]["items"]
}

const StartScreen = ({levels}: Props) => {
  console.log(levels)
  return (
    <>
      <Head>
        <title>Big Boss Battle Trivia</title>
        <link rel="icon" href="/onslaught_hexagon.png"/>
      </Head>
      <header>
        <h2>BIG BOSS BATTLE TRIVIA</h2>
      </header>
      <ul>
        {levels.map(level => (
          <li key={level.id}>
            {level.boss}
            <Image src={level.bossImgUrl} height={250} width={250} layout={'intrinsic'}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  try {
    const response = (await API.graphql(graphqlOperation(listLevels))) as {
      data: ListLevelsQuery, errors: {}[]
    }
    if (response.data.listLevels !== null) {
      return {
        props: {
          levels: response.data.listLevels.items
        }
      }
    } else {
      console.warn('Failed to fetch levels. ', response.errors)
      return {
        props: {
          levels: []
        }
      }
    }
  } catch (error) {
    console.warn(error)
    return {
        props: {
          levels: []
        }
      }
  }
}

export default StartScreen;