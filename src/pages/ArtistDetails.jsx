import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader } from "../components";
import { useDataContext } from "../context/dataContext";
import PlayPause from "../components/PlayPause";



// import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';


const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === song?.name ? "bg-[#4c426e]" : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song?.image?.[2]?.url || song?.image?.[1]?.url || song?.image?.[0]?.url }
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-xl font-bold text-white">{song?.name}</p>
        </Link>
        <p className="text-base text-gray-300 mt-1">
          {song?.label ? song.label : song.primaryArtists}
        </p>
      </div>
    </div>
    <PlayPause
      activeSong={activeSong}
      song={song}
      // handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);


const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const [artistDetails, setArtistDetails] = useState();
  const [artistSongs, setArtistsongs] = useState();

  const { setSelectedId, selectedId, setActiveSong, activeSong } =
    useDataContext();


  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  // if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  // if (error) return <Error />;

  useEffect(() => {
    const getPlayList = async () => {
      const response = await axios.get(
        `https://saavn.dev/api/artists?id=${artistId}`
      );
      console.log("response", response.data.data);
      if (response.data.data) {
        setArtistDetails(response.data.data);
      }
    };
    if (artistId) {
      getPlayList();
    }
  }, []);

  useEffect(() => {
    const getArtistDetails = async () => {
      const response = await axios.get(
        `https://saavn.dev/api/artists/${artistId}/songs?page=1`
      );
      console.log("response od rtistr songs", response.data.data);
      if (response.data.data) {
        setArtistsongs(response.data.data.results);
      }
    };
    getArtistDetails();
  }, [artistDetails]);

  const handlePlayClick = (song, i) => {
    setActiveSong({ song, artistSongs, i });
  };


  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistDetails} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Artists Songs</h2>
        <div className="mt-5">
          {
            <div className="mt-4 flex flex-col gap-1">
              {artistSongs?.map((song, i) => (
                <TopChartCard
                  key={song.id}
                  song={song}
                  i={i}
                  activeSong={activeSong}
                  handlePlayClick={() => handlePlayClick(song, i)}
                />
              ))}
            </div>
          }
          {!artistSongs?.length && (
            <p className="text-gray-400 text-base my-1">
              No data found
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default ArtistDetails;
