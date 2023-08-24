import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let MediaContext = createContext(null);

export default function MediaContextProvider(props) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvs, setTrendingTvs] = useState([]);
  const [trendingPersons, setTrendingPersons] = useState([]);

  let getTrendingItems = async (mediaType, callback) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=cbb579474837fbeb79bcf583a58ad70f`
    );
    callback(data.results);
  };
  useEffect(() => {
    getTrendingItems("movie", setTrendingMovies);
    getTrendingItems("tv", setTrendingTvs);
    getTrendingItems("person", setTrendingPersons);
  }, []);

  return (
    <MediaContext.Provider
      value={{ trendingMovies, trendingTvs, trendingPersons }}
    >
      {props.children}
    </MediaContext.Provider>
  );
}
