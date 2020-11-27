import React from 'react';
import Head from 'next/head'
import _ from 'lodash';

export default function Home() {
  /*
  console.log("page: index")
  console.log(window) // 서버사이드에서는 불가, window 객체는 client에만 존재함
  // alert, document, ... -> client side에만 존재하는 객체들
  */
  const [list, setList] = React.useState([]);
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    // 서버사이드에서는 실행되지 않는 client side 전용 이벤트
    // console.log("index > useEfect ")
    // console.log(localStorage)
    let result = localStorage.getItem("todo-list");
    if (!result) {
      result = [];
    }
    else {
      try {
        result = JSON.parse(result);
      } catch (error) {
        console.error(error);
        result = [];
      }
    }
    setList(result);
  }, [])

  React.useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list])

  const addItem = React.useCallback(() => {
    const item = {
      id: (new Date().getTime().toString()),
      text,
    };
    setList([
      ...list,
      item,
    ]);
    setText('');
  }, [list, text])

  const removeItem = React.useCallback(id => {
    setList(_.reject(list, item => item.id == id))
  }, [list])

  return (
    <div className="py-8 px-16">
      <Head>
        <title>Todo list app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold">TO-DO List</h1>
      <div>
        <input
          type="text"
          className='border-1 p-1'
          value={text}
          onChange={event => setText(event.target.value)}
        >
        </input>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={addItem}
        >추가</button>
      </div>

      <ul className='list-disc'>
        {
          list.map(item => (
            <li key={item.id}>
              {item.text}
              <button className='ml-10 text-xs text-red-500'
                onClick={() => removeItem(item.id)}
              >[삭제]</button>
            </li>
          ))
        }
      </ul>

    </div>
  )
}
