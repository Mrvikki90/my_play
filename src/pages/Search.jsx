import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import { Error, Loader, SongCard } from "../components";


const Search = () => {
  const { searchTerm } = useParams();
  const [songDetails, setSongDetails] = useState();


  useEffect(() => {
    const getSearchSong = async () => {
      const response = await axios.get(
        `https://saavn.me/search/songs?query=${searchTerm}&page=1&limit=2`
      );
      console.log("response", response.data.data);
      if (response.data.data) {
        setSongDetails(response.data.data.results);
      }
    };
    if (searchTerm) {
      getSearchSong();
    }
  }, [searchTerm]);



  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songDetails?.map((song, i) => (
          <SongCard key={song.id} song={song} data={songDetails} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Search;
