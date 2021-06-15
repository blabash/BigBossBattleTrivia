import Link from "next/link";
import React, {
  useEffect,
  useRef,
  useReducer,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  getBossData,
  getBossSlugs,
  getNewQuestions,
  getQuestionAnswer,
} from "../lib/bosses";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { CreateSessionMutation } from "../src/API";
import { Inventory } from "./_app";

type Questions = Array<{
  __typename: string;
  updatedAt: string | null;
  createdAt: string | null;
  answers: Array<{
    __typename: string;
    text: string;
  } | null> | null;
  text: string | null;
  id: string | null;
  questionBossId: string | null;
} | null> | null;

type State = {
  currentQuestions: Questions;
  answerHistory: { givenIdx: number | null; correctIdx: number }[];
  timeRemaining: number;
  currQuestionIdx: number;
  givenAnswerIdx: number | null;
  roundStarted: boolean;
  playerHP: number;
  remainingPlayerHP: number;
  bossHP: number;
  remainingBossHP: number;
};

enum ActionType {
  SET_CURRENT_QUESTIONS = "set_current_questions",
  UPDATE_ANSWER_HISTORY = "update_answer_history",
  SET_GIVEN_ANSWER_IDX = "set_given_answer_idx",
  START_ROUND = "start_round",
  END_ROUND = "end_round",
  DECREMENT_TIMER = "decrement_timer",
  NEXT_QUESTION = "next_question",
  RESET_ROUND = "reset_round",
  DAMAGE_BOSS = "damage_boss",
  DAMAGE_PLAYER = "damage_player",
}

type ACTIONTYPE =
  | {
      type: ActionType.SET_CURRENT_QUESTIONS;
      payload: Questions;
    }
  | {
      type: ActionType.UPDATE_ANSWER_HISTORY;
      payload: { givenIdx: number | null; correctIdx: number };
    }
  | {
      type: ActionType.SET_GIVEN_ANSWER_IDX;
      payload: number;
    }
  | { type: ActionType.START_ROUND }
  | { type: ActionType.END_ROUND }
  | { type: ActionType.DECREMENT_TIMER }
  | { type: ActionType.NEXT_QUESTION }
  | {
      type: ActionType.RESET_ROUND;
    }
  | { type: ActionType.DAMAGE_BOSS }
  | { type: ActionType.DAMAGE_PLAYER };

function reducer(state: Readonly<State>, action: ACTIONTYPE): Readonly<State> {
  switch (action.type) {
    case ActionType.SET_CURRENT_QUESTIONS:
      return { ...state, currentQuestions: action.payload };
    case ActionType.UPDATE_ANSWER_HISTORY:
      return {
        ...state,
        answerHistory: state.answerHistory.concat(action.payload),
      };
    case ActionType.SET_GIVEN_ANSWER_IDX:
      return { ...state, givenAnswerIdx: action.payload };
    case ActionType.START_ROUND:
      return { ...state, roundStarted: true };
    case ActionType.END_ROUND:
      return { ...state, roundStarted: false };
    case ActionType.DECREMENT_TIMER:
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    case ActionType.NEXT_QUESTION:
      return {
        ...state,
        currQuestionIdx: state.currQuestionIdx + 1,
        givenAnswerIdx: null,
        timeRemaining: 5,
      };
    case ActionType.RESET_ROUND:
      return {
        ...state,
        timeRemaining: 5,
        currQuestionIdx: 0,
        givenAnswerIdx: null,
        roundStarted: false,
        playerHP: 3,
        remainingPlayerHP: 3,
        bossHP: 3,
        remainingBossHP: 3,
        answerHistory: [],
      };
    case ActionType.DAMAGE_BOSS:
      return {
        ...state,
        remainingBossHP: state.remainingBossHP - 1,
      };
    case ActionType.DAMAGE_PLAYER:
      return {
        ...state,
        remainingPlayerHP: state.remainingPlayerHP - 1,
      };
    default:
      console.warn("No matching type for that action.");
      return state;
  }
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {
  sessionId: CreateSessionMutation["createSession"]["id"];
  lootBoss: (bossId: string, sessionId: string) => void;
}

const initialState: State = {
  currentQuestions: null,
  answerHistory: [],
  timeRemaining: 5,
  currQuestionIdx: 0,
  givenAnswerIdx: null,
  roundStarted: false,
  playerHP: 3,
  remainingPlayerHP: 3,
  bossHP: 3,
  remainingBossHP: 3,
};

export default function Boss({ bossData, sessionId, lootBoss }: Props) {
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<string | null>(null);

  const timeRemainingId = useRef<number | null>(null);
  const clearTimeRemaining = () =>
    window.clearInterval(timeRemainingId.current);

  useEffect(() => {
    const setQuestions = async (): Promise<void> => {
      const res = await getNewQuestions(sessionId, bossData.id, 8);
      console.log(`questions`, res);
      if (!res || res.__typename === "DdbError") {
        setError("Could not fetch questions");
      } else {
        dispatch({
          type: ActionType.SET_CURRENT_QUESTIONS,
          payload: res.newQuestions,
        });
      }
    };

    if (gameState.roundStarted === false) {
      setQuestions();
    }
  }, [gameState.roundStarted]);

  useEffect(() => {
    if (gameState.roundStarted === true) {
      timeRemainingId.current = window.setInterval(() => {
        dispatch({ type: ActionType.DECREMENT_TIMER });
      }, 1000);
    }
    return clearTimeRemaining;
  }, [gameState.roundStarted, gameState.currQuestionIdx]);

  useEffect(() => {
    const getCorrectAnswer = async (): Promise<void> => {
      const currQuestionId =
        gameState.currentQuestions[gameState.currQuestionIdx].id;
      const answers = await getQuestionAnswer(currQuestionId);
      console.log(`answers`, answers);
      const correctIdx = answers.findIndex((ans) => ans.correct);
      if (!answers) {
        setError("Could not fetch answer");
      } else {
        gameState.givenAnswerIdx === correctIdx
          ? dispatch({ type: ActionType.DAMAGE_BOSS })
          : dispatch({ type: ActionType.DAMAGE_PLAYER });
      }
      dispatch({
        type: ActionType.UPDATE_ANSWER_HISTORY,
        payload: { givenIdx: gameState.givenAnswerIdx, correctIdx },
      });
    };

    if (gameState.givenAnswerIdx !== null || gameState.timeRemaining <= 0) {
      clearTimeRemaining();
      getCorrectAnswer();
    }
  }, [gameState.givenAnswerIdx, gameState.timeRemaining]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (
        gameState.remainingBossHP >= 1 &&
        gameState.remainingPlayerHP >= 1 &&
        gameState.roundStarted
      ) {
        dispatch({ type: ActionType.NEXT_QUESTION });
        return;
      } else if (gameState.currQuestionIdx > 0) {
        if (gameState.remainingBossHP <= 0) {
          lootBoss(bossData.id, sessionId);
        }
        dispatch({ type: ActionType.END_ROUND });
      }
    }, 2000);

    return () => window.clearTimeout(id);
  }, [gameState.remainingPlayerHP, gameState.remainingBossHP]);

  return (
    <div>
      <Head>
        <title>Big Boss Battle Trivia: {bossData.name}</title>
        <link rel="icon" href="/onslaught_hexagon.png" />
      </Head>
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
      <h1>{bossData.name}</h1>
      <Image
        src={bossData.bossImgUrl}
        height={300}
        width={300}
        layout={"intrinsic"}
      />
      <br />
      {!gameState.roundStarted &&
        gameState.remainingBossHP === gameState.bossHP &&
        gameState.remainingPlayerHP === gameState.playerHP && (
          <button onClick={() => dispatch({ type: ActionType.START_ROUND })}>
            Begin
          </button>
        )}
      {!gameState.roundStarted &&
        (gameState.remainingPlayerHP === 0 ||
          gameState.remainingBossHP === 0) && (
          <button onClick={() => dispatch({ type: ActionType.RESET_ROUND })}>
            Restart
          </button>
        )}
      <h3>
        boss HP: {gameState.remainingBossHP}/{gameState.bossHP}
      </h3>
      <h3>
        your HP: {gameState.remainingPlayerHP}/{gameState.playerHP}
      </h3>
      {gameState.roundStarted && <h2>{gameState.timeRemaining}</h2>}
      {gameState.roundStarted && !gameState.currentQuestions && (
        <p>Patience mortal, loading questions...</p>
      )}
      {gameState.roundStarted && gameState.currentQuestions && (
        <div>
          <p>{gameState.currentQuestions[gameState.currQuestionIdx].text}</p>
          <ul>
            {gameState.currentQuestions[gameState.currQuestionIdx].answers.map(
              ({ text }, idx: number) => (
                <li key={text}>
                  <button
                    onClick={() => {
                      dispatch({
                        type: ActionType.SET_GIVEN_ANSWER_IDX,
                        payload: idx,
                      });
                    }}
                    disabled={
                      gameState.givenAnswerIdx !== null ||
                      gameState.timeRemaining <= 0
                    }
                  >
                    {text}
                  </button>
                </li>
              )
            )}
          </ul>
          {gameState.givenAnswerIdx !== null && (
            <p>
              you said:{" "}
              {
                gameState.currentQuestions[gameState.currQuestionIdx].answers[
                  gameState.givenAnswerIdx
                ].text
              }
            </p>
          )}
          {gameState.answerHistory[gameState.currQuestionIdx] && (
            <p>
              correct answer:{" "}
              {
                gameState.currentQuestions[gameState.currQuestionIdx].answers[
                  gameState.answerHistory[gameState.currQuestionIdx].correctIdx
                ].text
              }
            </p>
          )}
        </div>
      )}
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
