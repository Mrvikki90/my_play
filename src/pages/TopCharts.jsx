import React, { useEffect, useState } from "react";
import axios from "axios";
import { Error, SongCard } from "../components";

const TopCharts = () => {
  const [topCharts, setTopCharts] = useState([]);
  const [error, setError] = useState(false);


  useEffect(() => {
    const getTopCharts = async () => {
      try {
        const response = await axios.get(
          "https://saavn.dev/api/search/songs?query=slowed+reverb+latest&page=1&limit=18"
        );
        if (response.data.data) {
          setTopCharts(response.data.data.results);
        }
      } catch (error) {
        console.log("error", error);
        setError(true);
      }
    };
    getTopCharts();
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Slowed Reverbs
      </h2>
      {error ? (
        <Error />
      ) : (
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {topCharts.map((song, i) => (
            <SongCard key={song.key} song={song} data={topCharts} i={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCharts;
