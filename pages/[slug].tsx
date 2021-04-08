import Link from 'next/link'
import React from 'react'
import { getBossslugs } from '../lib/bosses'

export default function Boss() {
  return (
    <div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      {' '}
      Boss Name Goes Here
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await getBossslugs()
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  return {
    props: {
      foo: 'bar'
    }
  }
}