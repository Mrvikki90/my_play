import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useSelector } from "react-redux";

import { Error, Loader, PlayListCard } from "../components";
// import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const CountryTracks = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [topPlayList, setTopPlayList] = useState();

  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    const getPlayList = async () => {
      const response = await axios.get(
        "https://saavn.dev/api/modules?language=hindi,english"
      );
      console.log(response.data.data.playlists);
      if (response.data.data) {
        setTopPlayList(response.data.data.playlists);
      }
    };
    getPlayList();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://geo.ipify.org/api/v2/country?apiKey=${
  //         import.meta.env.VITE_GEO_API_KEY
  //       }`
  //     )
  //     .then((res) => setCountry(res?.data?.location.country))
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, [country]);

  // if (isFetching && loading)
  //   return <Loader title="Loading Songs around you..." />;

  // if (error && country !== "") return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Playlist <span className="font-black">PlayList</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topPlayList?.map((song, i) => (
          <PlayListCard key={song.id} song={song} data={topPlayList} i={i} />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
