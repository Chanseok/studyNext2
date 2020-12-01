import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import Error from 'next/error';
import Link from 'next/link';
import { DatePicker } from 'antd';
import moment from 'moment';
import Router from 'next/router';
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
  // console.log(moment(props.targetDt, 'YYYYMMDD'))

  return (
    <div >
      <Head>
        <title>Box Office</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>박스 오피스</h1>

      <div>
        {/* <DatePicker/> */}
        <DatePicker
          defaultValue={moment(props.targetDt, 'YYYYMMDD')}
          dateFormat={'YYYYMMDD'}
          onChange={date => {
            if (date == null) { // set to yesterday when clear date field
              Router.push('/?targetDt=' + moment().subtract(1, 'day').format('YYYYMMDD'))
              return
            }
            Router.push('/?targetDt=' + date.format('YYYYMMDD'))
          }}
        />
      </div>

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

  const targetDt = context.query.targetDt || moment().subtract(1, 'day').format('YYYYMMDD');

  let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json'
  url += '?key=' + appKey.key;
  url += '&targetDt=' + targetDt
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    return {
      targetDt,
      data: response.data,
    }
  } catch (error) {
    console.warn(error);
    return { error }
  }

}

// export default Home;
