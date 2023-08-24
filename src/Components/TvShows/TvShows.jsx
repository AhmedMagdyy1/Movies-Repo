import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MediaContext } from "../Context/mediaStore";

export default function TvShows() {
  let { trendingTvs } = useContext(MediaContext);
  // const [trendingTvs, setTrendingTvs] = useState([]);
  // let getTrendingTvs = async () => {
  //   let { data } = await axios.get(
  //     "https://api.themoviedb.org/3/trending/tv/day?api_key=cbb579474837fbeb79bcf583a58ad70f"
  //   );
  //   setTrendingTvs(data.results);
  //   console.log(data.results);
  // };
  // useEffect(() => {
  //   getTrendingTvs();
  // }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trending-TvShows</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {trendingTvs.length > 0 ? (
        <div className="row py-4 gy-3">
          <div className="col-md-4">
            <div className="welcome">
              <div className="brdr w-25 mb-3"></div>
              <h3>
                Trending <br />
                Tvs <br />
                To watch now
              </h3>
              <p className="text-muted mb-3">Most Watched Tvs by days</p>
              <div className="brdr"></div>
            </div>
          </div>
          {trendingTvs.slice(0, 10).map((item, index) => (
            <div key={index} className="col-md-2">
              <Link
                to={`/details/${item.id}/${item.media_type}`}
                className="nav-link"
              >
                <div className="item position-relative">
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt=""
                  />
                  <h3 className="h6">{item.name}</h3>
                  <span className="position-absolute top-0 end-0 p-2 bg-info">
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i class="fas fa-spinner fa-spin fa-4x text-info"></i>
        </div>
      )}
    </>
  );
}
