import React from 'react';
import Head from 'next/head'

export default function Home() {
  /*
  console.log("page: index")
  console.log(window) // 서버사이드에서는 불가, window 객체는 client에만 존재함
  // alert, document, ... -> client side에만 존재하는 객체들
  */

  React.useEffect(() => {
    // 서버사이드에서는 실행되지 않는 client side 전용 이벤트
    // console.log("index > useEfect ")
    // console.log(localStorage)

  }, [])

  return (
    <div className="py-8 px-16">
      <Head>
        <title>Todo list app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold">TO-DO List</h1>
      <div>
        <input type="text" className='border-2 py-2'></input>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>추가</button>
      </div>

      <ul className='list-disc'>
        <li>할일 내용 1
        <button className='ml-10 text-xs text-red-500'>[삭제]</button>
        </li>
      </ul>
      <p>Lorem ipsum dolor sit amet, consectetur</p>

    </div>
  )
}
