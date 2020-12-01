import axios from 'axios';
import Error from 'next/error';
import Router from 'next/router';

export default function MovieInfo(props) {
    if (props.error) {
        // console.log(props.error);
        return <Error title={props.error.message} />;
    }
    if (props.data.faultInfo) {
        // console.log(props.error);
        return <Error title={props.data.faultInfo.message} />;
    }

    console.log(props.data.movieInfoResult)
    const info = props.data.movieInfoResult.movieInfo
    return (
        <div>
            <h1>{info.movieNm} <small>{info.movieNmEn}</small></h1>
            <p>개봉일: {info.openDt}</p>
            <dl>
                <dt>감독</dt>
                <dd>
                    {info.directors.map(director => director.peopleNm).join(", ")}
                </dd>
                <dt>출연</dt>
                <dd>
                    {/* {info.actors.map(actor=> actor.peopleNm + ` (${actor.cast})`).join(", ")} */}
                    {info.actors.map(actor => actor.peopleNm).join(", ")}
                </dd>
                <dt>장르</dt>
                <dd>
                    {info.genres.map(genre => genre.genreNm).join(", ")}
                </dd>
                <dt>국가</dt>
                <dd>
                    {info.nations.map(nation => nation.nationNm).join(", ")}
                </dd>
            </dl>
            <button onClick={() => Router.back()}>돌아가기</button>
        </div>
    )
}



MovieInfo.getInitialProps = async function (context) {
    let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json'
    url += '?key=c4157cba1ba82ad8cbbf45014065e58b'
    url += '&movieCd=' + context.query.code;

    try {
        const response = await axios.get(url);
        // console.log(response);
        return {
            data: response.data,
        };

    } catch (error) {
        console.warn(error.message);
        return { error };
    }

}