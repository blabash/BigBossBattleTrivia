import Link from 'next/link';
import React, { useEffect, useRef, useReducer } from 'react';
import { getBossData, getBossSlugs, getBossQuestions } from '../lib/bosses';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { GetBossQuery } from '../src/API';

type InitialState = {
  questions: GetBossQuery['getBoss']['questions']['items'];
  timeRemaining: number;
  currQuestionIdx: number;
  givenAnswerIdx: number | null;
  roundStarted: boolean;
  playerHP: number;
  remainingPlayerHP: number;
  bossHP: number;
  remainingBossHP: number;
};

type ACTIONTYPE =
  | {
      type: 'set_questions';
      payload: GetBossQuery['getBoss']['questions']['items'];
    }
  | { type: 'start_round' }
  | { type: 'end_round' }
  | { type: 'decrement_timer' }
  | { type: 'next_question' }
  | {
      type: 'reset_round';
      payload: GetBossQuery['getBoss']['questions']['items'];
    }
  | { type: 'damage_boss'; payload: number }
  | { type: 'damage_player'; payload: number };

function reducer(state: InitialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'set_questions':
      return { ...state, questions: action.payload };
    case 'start_round':
      return { ...state, roundStarted: true };
    case 'end_round':
      return { ...state, roundStarted: false };
    case 'decrement_timer':
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    case 'next_question':
      return {
        ...state,
        currQuestionIdx: state.currQuestionIdx + 1,
        givenAnswerIdx: null,
        timeRemaining: 5,
      };
    case 'reset_round':
      return init(action.payload);
    case 'damage_boss':
      return {
        ...state,
        remainingBossHP: state.remainingBossHP - 1,
        givenAnswerIdx: action.payload,
      };
    case 'damage_player':
      return {
        ...state,
        remainingPlayerHP: state.remainingPlayerHP - 1,
        givenAnswerIdx: action.payload,
      };
    default:
      console.warn('No matching type for that action.');
      return state;
  }
}

function init(
  questions: GetBossQuery['getBoss']['questions']['items'] = null
): InitialState {
  return {
    questions,
    timeRemaining: 5,
    currQuestionIdx: 0,
    givenAnswerIdx: null,
    roundStarted: false,
    playerHP: 3,
    remainingPlayerHP: 3,
    bossHP: 3,
    remainingBossHP: 3,
  };
}

export default function Boss({
  bossData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  const timeRemainingId = useRef<number | null>(null);
  const clearTimeRemaining = () =>
    window.clearInterval(timeRemainingId.current);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getBossQuestions(bossData.id);
      console.log(questions);
      dispatch({ type: 'set_questions', payload: questions });
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (state.roundStarted === true || state.currQuestionIdx) {
      if (state.roundStarted) {
        timeRemainingId.current = window.setInterval(() => {
          dispatch({ type: 'decrement_timer' });
        }, 1000);
      }
    }
    return clearTimeRemaining;
  }, [state.roundStarted, state.currQuestionIdx]);

  useEffect(() => {
    if (state.givenAnswerIdx !== null || state.timeRemaining === 0) {
      clearTimeRemaining();
      if (state.timeRemaining === 0) {
        dispatch({ type: 'damage_player', payload: null });
      }
    }
  }, [state.givenAnswerIdx, state.timeRemaining]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (
        state.remainingBossHP >= 1 &&
        state.remainingPlayerHP >= 1 &&
        state.roundStarted
      ) {
        dispatch({ type: 'next_question' });
        return;
      } else if (state.currQuestionIdx > 0) {
        dispatch({ type: 'end_round' });
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
          <button onClick={() => dispatch({ type: 'start_round' })}>
            Begin
          </button>
        )}
      {!state.roundStarted &&
        (state.remainingPlayerHP === 0 || state.remainingBossHP === 0) && (
          <button
            onClick={() =>
              dispatch({ type: 'reset_round', payload: state.questions })
            }
          >
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
      {state.roundStarted && !state.questions && (
        <p>Patience mortal, loading questions...</p>
      )}
      {state.roundStarted && state.questions && (
        <div>
          <p>{state.questions[state.currQuestionIdx].text}</p>
          <ul>
            {state.questions[state.currQuestionIdx].answers.map(
              ({ text, correct }, idx) => (
                <li key={text}>
                  <button
                    onClick={() => {
                      if (correct) {
                        dispatch({ type: 'damage_boss', payload: idx });
                      } else {
                        dispatch({ type: 'damage_player', payload: idx });
                      }
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
                state.questions[state.currQuestionIdx].answers[
                  state.givenAnswerIdx
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
