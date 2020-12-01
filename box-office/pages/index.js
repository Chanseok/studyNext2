import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import Error from 'next/error';
import Link from 'next/link';

export default function Home(props) {
  if (props.error) {
    // console.log(props.error);
    return <Error title={props.error.message} />;
  }
  if (props.data.faultInfo) {
    // console.log(props.error);
    return <Error title={props.data.faultInfo.message} />;
  }
  // console.log(props.data.boxOfficeResult.dailyBoxOfficeList);

  return (
    <div >
      <Head>
        <title>Box Office</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>박스 오피스</h1>
      <p> 기준: {props.year}년 {props.month}월 {props.day}일</p>

      <div>
        {
          props.data.boxOfficeResult.dailyBoxOfficeList.map(item => (
            <div key={item.movieCd}>
              [{item.rank}]
              {' '}
              <Link href="/movies/[code]" as={'/movies/' + item.movieCd}>
                <a >
                  {item.movieNm}
                </a>
              </Link>
              {' '}
              <small>({item.openDt})</small>
            </div>
          ))
        }
      </div>
    </div>
  )
}

Home.getInitialProps = async function (context) {
  // app key value read from file
  const appKey = require('../apiKey.json');

  // yesterday as target date code  
  let d = new Date();
  d.setDate(d.getDate() - 1)
  const { year: year, month: month, day: day } = getDateStrings(d)
  const targetDt = year + month + day;

  let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'
  url += '?key=' + appKey.key;
  url += '&targetDt=' + targetDt
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return {
      data: response.data,
      year: year,
      month: month,
      day: day,
    }
  } catch (error) {
    console.warn(error);
    return { error }
  }

}
// export default Home;

/*
 * 날짜포맷 yyyy-MM-dd 변환
 */
function getDateStrings(date) {
  const year = date.getFullYear().toString();
  let month = (1 + date.getMonth()).toString();
  month = month >= 10 ? month : '0' + month;
  let day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  // return year +'-' + month +'-'+ day;
  return {
    year, month, day,
  };
}