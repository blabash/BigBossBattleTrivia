import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { getBossData, getBossSlugs, getBossQuestions } from '../lib/bosses';
import { useRouter } from 'next/router';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { GetBossQuery } from '../src/API';

export default function Boss({
  bossData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currQuestionIdx, setCurrQuestionIdx] = useState(0);
  const [givenAnswerIdx, setGivenAnswerIdx] = useState<0 | 1 | 2 | 3 | null>(
    null
  );
  const [goToNextQuestion, setGoToNextQuestion] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5);

  const questionsRef = useRef(null);

  const timeRemainingId = useRef<number | null>(null);
  const clearTimeRemaining = () =>
    window.clearInterval(timeRemainingId.current);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getBossQuestions(bossData.id);
      console.log(questions);
      questionsRef.current = questions;
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (roundStarted === true || goToNextQuestion === true) {
      setGoToNextQuestion(false);
      timeRemainingId.current = window.setInterval(() => {
        setTimeRemaining((t) => t - 1);
      }, 1000);
    }
    return clearTimeRemaining;
  }, [roundStarted, goToNextQuestion]);

  useEffect(() => {
    let id: number;
    if (timeRemaining === 0 || givenAnswerIdx !== null) {
      clearTimeRemaining();
      id = window.setTimeout(() => {
        if (currQuestionIdx === questionsRef.current.length - 1) {
          setRoundStarted(false);
          setTimeRemaining(5);
          setCurrQuestionIdx(0);
          setGoToNextQuestion(false);
          setGivenAnswerIdx(null);
          return;
        }
        setGoToNextQuestion(true);
        setCurrQuestionIdx((c) => c + 1);
        setGivenAnswerIdx(null);
        setTimeRemaining(5);
      }, 2000);
    }

    return () => window.clearTimeout(id);
  }, [timeRemaining, givenAnswerIdx]);

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
      <h2>{timeRemaining}</h2>
      <Image
        src={bossData.bossImgUrl}
        height={300}
        width={300}
        layout={'intrinsic'}
      />
      <br />
      {!roundStarted && (
        <button onClick={() => setRoundStarted(true)}>Begin</button>
      )}
      {roundStarted && !questionsRef.current && (
        <p>Patience mortal, loading questions...</p>
      )}
      {roundStarted && questionsRef.current && (
        <div>
          <p>{questionsRef.current[currQuestionIdx]?.text}</p>
          <ul>
            {questionsRef.current[currQuestionIdx]?.answers?.items?.map(
              ({ text, id }, idx) => (
                <li key={id}>
                  <button
                    onClick={() => setGivenAnswerIdx(idx)}
                    disabled={givenAnswerIdx !== null || timeRemaining <= 0}
                  >
                    {text}
                  </button>
                </li>
              )
            )}
          </ul>
          {givenAnswerIdx !== null && (
            <p>
              you said:{' '}
              {
                questionsRef.current[currQuestionIdx]?.answers?.items[
                  givenAnswerIdx
                ]?.text
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
