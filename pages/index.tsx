import * as React from "react";
import {API, graphqlOperation} from 'aws-amplify'
import awsconfig from '../src/aws-exports'
API.configure(awsconfig)

const App = () => {
  return (
    <>
      <header>
        <h2>BIG BOSS BATTLE TRIVIA</h2>
      </header>
      <main>Hello World</main>
    </>
  );
};
export default App;