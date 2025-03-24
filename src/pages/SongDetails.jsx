import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader } from "../components";

// import { setActiveSong, playPause } from '../redux/features/playerSlice';
// import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  // const dispatch = useDispatch();
  const [songDetails, setSongDetails] = useState();
  const [hasLyrics, setHasLyrics] = useState(Boolean);
  const [songLyrics, setSongLyrics] = useState();
  const [hasNoLyrics, setHasNoLyrics] = useState(false);

  const { songid, id: artistId } = useParams();
  // const { activeSong, isPlaying } = useSelector((state) => state.player);

  // const { data, isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery({ songid });
  // const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

  useEffect(() => {
    const getSongDetails = async () => {
      let apiUrl;
      if (songid) {
        const isSongKeyIdValid = songid.match(/^[a-zA-Z0-9]+$/);
        apiUrl = isSongKeyIdValid
          ? `https://saavn.dev/api/songs?id=${songid}`
          : `https://saavn.dev/api/search/songs?query=${encodeURIComponent(
              songid
            )}&page=1&limit=2`;
      }

      try {
        const response = await axios.get(apiUrl);
        console.log("response", response.data.data);
        if (response.data.data) {
          setSongDetails(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getSongDetails();
  }, [songid]);

  useEffect(() => {
    if (songDetails && songDetails.hasLyrics) {
      const getSongLyrics = async () => {
        try {
          const response = await axios.get(
            `https://saavn.dev/api/lyrics?id=${songid}`
          );
          if (response.data.status === "FAILED") {
            console.error("Lyrics API request failed:", response.data.message);
            // You can set an error state for lyrics here and use it to display an error message in your JSX
            // setLyricsErrorState(response.data.message);
          } else {
            console.log(response.data);
            setSongLyrics(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching lyrics:", error);
          // You can set an error state for lyrics here and use it to display an error message in your JSX
          // setLyricsErrorState("Error fetching lyrics");
        }
      };
      getSongLyrics();
    }
  }, [songDetails, songid]);

  // if (isFetchingSongDetails && isFetchinRelatedSongs) return <Loader title="Searching song details" />;

  // console.log(songData);

  // if (error) return <Error />;

  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };

  // const handlePlayClick = (song, i) => {
  //   dispatch(setActiveSong({ song, data, i }));
  //   dispatch(playPause(true));
  // };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songDetails} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {hasLyrics ? (
            songDetails &&
            songDetails?.hasLyrics &&
            songLyrics?.lyrics.split("\n").map((line, i) => (
              <p
                key={`lyrics-${line}-${i}`}
                className="text-gray-400 text-base my-1"
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, No lyrics found!
            </p>
          )}
        </div>
      </div>

      {/* <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      /> */}
    </div>
  );
};

export default SongDetails;
