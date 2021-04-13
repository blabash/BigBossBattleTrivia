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
  goToNextQuestion: boolean;
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
  | { type: 'decrement_timer' }
  | { type: 'set_given_answer_idx'; payload: number }
  | { type: 'go_to_next_question' }
  | {
      type: 'reset_round';
      payload: GetBossQuery['getBoss']['questions']['items'];
    }
  | { type: 'damage_boss' }
  | { type: 'damage_player' }
  | { type: 'prevent_next_question' };

function reducer(state: InitialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'set_questions':
      return { ...state, questions: action.payload };
    case 'start_round':
      return { ...state, roundStarted: true };
    case 'decrement_timer':
      return { ...state, timeRemaining: state.timeRemaining - 1 };
    case 'set_given_answer_idx':
      return { ...state, givenAnswerIdx: action.payload };
    case 'go_to_next_question':
      return {
        ...state,
        goToNextQuestion: true,
        currQuestionIdx: state.currQuestionIdx + 1,
        givenAnswerIdx: null,
        timeRemaining: 5,
      };
    case 'reset_round':
      return init(action.payload);
    case 'damage_boss':
      return { ...state, remainingBossHP: state.remainingBossHP - 1 };
    case 'damage_player':
      return { ...state, remainingPlayerHP: state.remainingPlayerHP - 1 };
    case 'prevent_next_question':
      return { ...state, goToNextQuestion: false };
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
    goToNextQuestion: false,
    roundStarted: false,
    playerHP: 3,
    remainingPlayerHP: 3,
    bossHP: 20,
    remainingBossHP: 20,
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
    if (state.roundStarted === true || state.goToNextQuestion === true) {
      dispatch({ type: 'prevent_next_question' });
      timeRemainingId.current = window.setInterval(() => {
        dispatch({ type: 'decrement_timer' });
      }, 1000);
    }
    return clearTimeRemaining;
  }, [state.roundStarted, state.goToNextQuestion]);

  useEffect(() => {
    let id: number;

    if (state.timeRemaining === 0 || state.givenAnswerIdx !== null) {
      clearTimeRemaining();
      id = window.setTimeout(() => {
        if (state.currQuestionIdx === state.questions.length - 1) {
          dispatch({ type: 'reset_round', payload: state.questions });
          return;
        }
        dispatch({ type: 'go_to_next_question' });
      }, 2000);
    }

    return () => window.clearTimeout(id);
  }, [state.timeRemaining, state.givenAnswerIdx]);

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
      {!state.roundStarted && (
        <button onClick={() => dispatch({ type: 'start_round' })}>Begin</button>
      )}
      {state.roundStarted && <h2>{state.timeRemaining}</h2>}
      {state.roundStarted && !state.questions && (
        <p>Patience mortal, loading questions...</p>
      )}
      {state.roundStarted && state.questions && (
        <div>
          <p>{state.questions[state.currQuestionIdx].text}</p>
          <ul>
            {state.questions[state.currQuestionIdx].answers.map(
              ({ text }, idx) => (
                <li key={text}>
                  <button
                    onClick={() =>
                      dispatch({ type: 'set_given_answer_idx', payload: idx })
                    }
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
