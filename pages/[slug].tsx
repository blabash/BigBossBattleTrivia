import Link from 'next/link';
import React, { useEffect, useRef, useReducer } from 'react';
import { getBossData, getBossSlugs, getBossQuestions } from '../lib/bosses';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { CreateSessionMutation, GetBossQuery } from '../src/API';

type InitialState = {
  questionsBank: GetBossQuery['getBoss']['questions']['items'];
  currentQuestions: GetBossQuery['getBoss']['questions']['items'];
  timeRemaining: number;
  currQuestionIdx: number;
  givenAnswerIdx: number | null;
  roundStarted: boolean;
  playerHP: number;
  remainingPlayerHP: number;
  bossHP: number;
  remainingBossHP: number;
};

const initialState = {
  questionsBank: null,
  currentQuestions: null,
  timeRemaining: 5,
  currQuestionIdx: 0,
  givenAnswerIdx: null,
  roundStarted: false,
  playerHP: 3,
  remainingPlayerHP: 3,
  bossHP: 3,
  remainingBossHP: 3,
};

type ACTIONTYPE =
  | {
      type: 'set_questions_bank';
      payload: GetBossQuery['getBoss']['questions']['items'];
    }
  | {
      type: 'set_current_questions';
      payload: GetBossQuery['getBoss']['questions']['items'];
    }
  | { type: 'start_round' }
  | { type: 'end_round' }
  | { type: 'decrement_timer' }
  | { type: 'next_question' }
  | {
      type: 'reset_round';
    }
  | { type: 'damage_boss'; payload: number }
  | { type: 'damage_player'; payload: number };

function reducer(state: InitialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'set_questions_bank':
      return { ...state, questionsBank: action.payload };
    case 'set_current_questions':
      return { ...state, currentQuestions: action.payload };
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
      };
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

function init(): InitialState {
  return {
    questionsBank: null,
    currentQuestions: null,
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

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {
  sessionId: CreateSessionMutation['createSession']['id'];
}

export default function Boss({ bossData, sessionId }: Props) {
  console.log('in slug', sessionId);
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextTokenRef = useRef<string | null>(null);
  const numTimesQuestionsSet = useRef(0);
  const alreadyPickedQuestions = useRef({});
  const getRandomQuestions = (
    questions: GetBossQuery['getBoss']['questions']['items']
  ) => {
    return Array.from({ length: 4 }, () => {
      let randomIdx = Math.floor(Math.random() * 1000) % questions.length;
      while (alreadyPickedQuestions.current[randomIdx] && randomIdx >= 0) {
        randomIdx = Math.floor(Math.random() * 1000) % questions.length;
        console.log('infinite?');
      }
      alreadyPickedQuestions.current[randomIdx] = true;
      return questions[randomIdx];
    });
  };
  const timeRemainingId = useRef<number | null>(null);
  const clearTimeRemaining = () =>
    window.clearInterval(timeRemainingId.current);

  useEffect(() => {
    const setQuestions = async () => {
      let randomQuestions: GetBossQuery['getBoss']['questions']['items'];
      if (numTimesQuestionsSet.current === 0) {
        alreadyPickedQuestions.current = {};

        let res: {
          items: GetBossQuery['getBoss']['questions']['items'];
          nextToken?: string;
        };
        res = await getBossQuestions(bossData.id, 12, nextTokenRef.current);
        if (res.items.length < 12) {
          res = await getBossQuestions(bossData.id, 12);
        }

        const { items: questions, nextToken } = res;

        console.log('nextToken: ', nextToken);
        nextTokenRef.current = nextToken;
        console.log('fetched questions: ', questions);
        dispatch({ type: 'set_questions_bank', payload: questions });

        randomQuestions = getRandomQuestions(questions);
        console.log('randomly chosen questions after fetch: ', randomQuestions);
        // dispatch({ type: 'set_current_questions', payload: randomQuestions });
      } else {
        randomQuestions = getRandomQuestions(state.questionsBank);
        console.log('randomly chosen questions: ', randomQuestions);
      }
      dispatch({ type: 'set_current_questions', payload: randomQuestions });
      numTimesQuestionsSet.current =
        numTimesQuestionsSet.current === 2
          ? 0
          : numTimesQuestionsSet.current + 1;
    };

    if (state.roundStarted === false) {
      setQuestions();
    }
  }, [state.roundStarted]);

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
          <button onClick={() => dispatch({ type: 'reset_round' })}>
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
                state.currentQuestions[state.currQuestionIdx].answers[
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
