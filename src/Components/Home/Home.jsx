import React from "react";
import Movies from "../Movies/Movies";
import TvShows from "./../TvShows/TvShows";
import People from "./../People/People";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Noxe-Movies</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Movies />
      <TvShows />
      <People />
    </>
  );
}
