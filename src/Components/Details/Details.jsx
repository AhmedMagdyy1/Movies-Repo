import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Details() {
  const [itemDetails, setItemDetails] = useState({});
  const [genres, setGeners] = useState([]);
  let params = useParams();
  let getItemDetails = async () => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=cbb579474837fbeb79bcf583a58ad70f&language=en-US`
    );
    setItemDetails(data);
    setGeners(data.genres);
    console.log(data);
  };
  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <>
      {genres.length > 0 ? (
        <div className="row py-5">
          <div className="col-md-3">
            {params.mediaType === "person" ? (
              <img
                className="w-100"
                src={
                  "https://image.tmdb.org/t/p/original" +
                  itemDetails.profile_path
                }
                alt="movie"
              />
            ) : (
              <img
                className="w-100"
                src={
                  "https://image.tmdb.org/t/p/original" +
                  itemDetails.poster_path
                }
                alt="movie"
              />
            )}
          </div>
          <div className="col-md-9">
            {params.mediaType === "person" ? (
              <div>
                <h2 className="mt-2 text-info">
                  {itemDetails.original_name}
                  {itemDetails.name}
                </h2>
                <h5 className="mt-4">Popularity : {itemDetails.popularity}</h5>
                <h5 className="mt-4">
                  Known For : {itemDetails.known_for_department}
                </h5>
              </div>
            ) : (
              <div>
                <h2>
                  {itemDetails.title}
                  {itemDetails.name}
                </h2>
                <p className="text-muted my-3">
                  {itemDetails.overview}
                  {itemDetails.biography}
                </p>
                {genres.map((genre) => (
                  <div className="d-inline-block mb-4">
                    <button className="bg-info rounded-3">{genre.name}</button>
                  </div>
                ))}
                <h5 className="mt-3">Vote : {itemDetails.vote_average}</h5>
                <h5 className="mt-3">Vote Count: {itemDetails.vote_count}</h5>
                <h5 className="mt-3">Popularity : {itemDetails.popularity}</h5>
                <h5 className="mt-3">
                  Release Date : {itemDetails.release_date}
                </h5>
                <p className="text-muted mt-3">{itemDetails.overview}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i class="fas fa-spinner fa-spin fa-4x text-info"></i>
        </div>
      )}
    </>
  );
}
