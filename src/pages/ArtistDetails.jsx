import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader } from "../components";

// import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const [artistDetails, setArtistDetails] = useState();

  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  // if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  // if (error) return <Error />;

  useEffect(() => {
    const getPlayList = async () => {
      const response = await axios.get(
        `https://saavn.me/artists?id=${artistId}`
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

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistDetails} />

      {/* <RelatedSongs
        data={artistData?.data[0].views['top-songs']?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}
    </div>
  );
};

export default ArtistDetails;
