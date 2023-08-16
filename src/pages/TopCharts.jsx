import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from "../components";
// import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const [topCharts, setTopCharts] = useState();

  // const { data, isFetching, error } = useGetTopChartsQuery();
  // const { activeSong, isPlaying } = useSelector((state) => state.player);

  // if (isFetching) return <Loader title="Loading Top Charts" />;

  // if (error) return <Error />;

  useEffect(() => {
    const getTopCharts = async () => {
      const response = await axios.get(
        "https://saavn.me/search/songs?query=new&page=1&limit=18"
      );
      // console.log("response: ", response.data.data);
      if (response.data.data) {
        setTopCharts(response.data.data.results);
      }
    };
    getTopCharts();
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topCharts?.map((song, i) => (
          <SongCard key={song.key} song={song} data={topCharts} i={i} />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
