import * as React from "react";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import {ListLevelsQuery} from '../src/API'
import awsExports from '../src/aws-exports'
import { listLevels } from "../src/graphql/queries";
API.configure(awsExports)

type Props = {
  levels: ListLevelsQuery["listLevels"]["items"]
}

const StartScreen = ({levels}: Props) => {
  console.log(levels)
  return (
    <>
      <header>
        <h2>BIG BOSS BATTLE TRIVIA</h2>
      </header>
      <ul>
        {levels.map(level => (
          <li key={level.id}>
            {level.boss}
            <img src={level.bossImgUrl}/>
          </li>
        ))}
      </ul>
    </>
  );
};

StartScreen.getInitialProps = async () => {
  try {
    const response = (await API.graphql(graphqlOperation(listLevels))) as {
      data: ListLevelsQuery
    }

    if (response.data.listLevels !== null) {
      return {levels: response.data.listLevels.items}
    } else {
      return {levels: []}
    }
  } catch (error) {
    console.warn(error)
    return { levels: [] }
  }
}

export default StartScreen;