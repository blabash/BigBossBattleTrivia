import Link from 'next/link';
import React, { useEffect, useRef, useReducer, useState } from 'react';
import {
  getBossData,
  getBossSlugs,
  getNewQuestions,
  getQuestionAnswer,
} from '../lib/bosses';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { CreateSessionMutation } from '../src/API';

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

type InitialState = {
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

const initialState: InitialState = {
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

enum ActionType {
  SET_CURRENT_QUESTIONS = 'set_current_questions',
  UPDATE_ANSWER_HISTORY = 'update_answer_history',
  SET_GIVEN_ANSWER_IDX = 'set_given_answer_idx',
  START_ROUND = 'start_round',
  END_ROUND = 'end_round',
  DECREMENT_TIMER = 'decrement_timer',
  NEXT_QUESTION = 'next_question',
  RESET_ROUND = 'reset_round',
  DAMAGE_BOSS = 'damage_boss',
  DAMAGE_PLAYER = 'damage_player',
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

function reducer(state: InitialState, action: ACTIONTYPE) {
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
      console.warn('No matching type for that action.');
      return state;
  }
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {
  sessionId: CreateSessionMutation['createSession']['id'];
}

export default function Boss({ bossData, sessionId }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<string | null>(null);

  const timeRemainingId = useRef<number | null>(null);
  const clearTimeRemaining = () =>
    window.clearInterval(timeRemainingId.current);

  useEffect(() => {
    const setQuestions = async (): Promise<void> => {
      const res = await getNewQuestions(sessionId, bossData.id, 8);
      console.log(`questions`, res);
      if (!res || res.__typename === 'DdbError') {
        setError('Could not fetch questions');
      } else {
        dispatch({
          type: ActionType.SET_CURRENT_QUESTIONS,
          payload: res.newQuestions,
        });
      }
    };

    if (state.roundStarted === false) {
      setQuestions();
    }
  }, [state.roundStarted]);

  useEffect(() => {
    if (state.roundStarted === true || state.currQuestionIdx) {
      if (state.roundStarted) {
        timeRemainingId.current = window.setInterval(() => {
          dispatch({ type: ActionType.DECREMENT_TIMER });
        }, 1000);
      }
    }
    return clearTimeRemaining;
  }, [state.roundStarted, state.currQuestionIdx]);

  useEffect(() => {
    const getCorrectAnswer = async (): Promise<void> => {
      const currQuestionId = state.currentQuestions[state.currQuestionIdx].id;
      const answers = await getQuestionAnswer(currQuestionId);
      console.log(`answers`, answers);
      const correctIdx = answers.findIndex((ans) => ans.correct);
      if (!answers) {
        setError('Could not fetch answer');
      } else {
        state.givenAnswerIdx === correctIdx
          ? dispatch({ type: ActionType.DAMAGE_BOSS })
          : dispatch({ type: ActionType.DAMAGE_PLAYER });
      }
      dispatch({
        type: ActionType.UPDATE_ANSWER_HISTORY,
        payload: { givenIdx: state.givenAnswerIdx, correctIdx },
      });
    };

    if (state.givenAnswerIdx !== null || state.timeRemaining <= 0) {
      clearTimeRemaining();
      getCorrectAnswer();
    }
  }, [state.givenAnswerIdx, state.timeRemaining]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (
        state.remainingBossHP >= 1 &&
        state.remainingPlayerHP >= 1 &&
        state.roundStarted
      ) {
        dispatch({ type: ActionType.NEXT_QUESTION });
        return;
      } else if (state.currQuestionIdx > 0) {
        dispatch({ type: ActionType.END_ROUND });
      }
    }, 2000);

    return () => window.clearTimeout(id);
  }, [state.remainingPlayerHP, state.remainingBossHP]);

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
      <br />
      {!state.roundStarted &&
        state.remainingBossHP === state.bossHP &&
        state.remainingPlayerHP === state.playerHP && (
          <button onClick={() => dispatch({ type: ActionType.START_ROUND })}>
            Begin
          </button>
        )}
      {!state.roundStarted &&
        (state.remainingPlayerHP === 0 || state.remainingBossHP === 0) && (
          <button onClick={() => dispatch({ type: ActionType.RESET_ROUND })}>
            Restart
          </button>
        )}
      <h3>
        boss HP: {state.remainingBossHP}/{state.bossHP}
      </h3>
      <h3>
        your HP: {state.remainingPlayerHP}/{state.playerHP}
      </h3>
      {state.roundStarted && <h2>{state.timeRemaining}</h2>}
      {state.roundStarted && !state.currentQuestions && (
        <p>Patience mortal, loading questions...</p>
      )}
      {state.roundStarted && state.currentQuestions && (
        <div>
          <p>{state.currentQuestions[state.currQuestionIdx].text}</p>
          <ul>
            {state.currentQuestions[state.currQuestionIdx].answers.map(
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
                      state.givenAnswerIdx !== null || state.timeRemaining <= 0
                    }
                  >
                    {text}
                  </button>
                </li>
              )
            )}
          </ul>
          {state.givenAnswerIdx !== null && (
            <p>
              you said:{' '}
              {
                state.currentQuestions[state.currQuestionIdx].answers[
                  state.givenAnswerIdx
                ].text
              }
            </p>
          )}
          {state.answerHistory[state.currQuestionIdx] && (
            <p>
              correct answer:{' '}
              {
                state.currentQuestions[state.currQuestionIdx].answers[
                  state.answerHistory[state.currQuestionIdx].correctIdx
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
