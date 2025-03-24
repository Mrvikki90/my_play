import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArtistCard, Error, Loader } from "../components";
// import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState();

  // const { data, isFetching, error } = useGetTopChartsQuery();

  // if (isFetching) return <Loader title="Loading artists..." />;

  // if (error) return <Error />;

  useEffect(() => {
    const getTopCharts = async () => {
      const response = await axios.get(
        "https://saavn.dev/api/search/artists?query=top-artist"
      );
      if (response.data.data) {
        console.log("get top charts=====>", response.data.data)
        setTopArtists(response.data.data.results);
      }
    };
    getTopCharts();
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topArtists?.map((track) => (
          <ArtistCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
