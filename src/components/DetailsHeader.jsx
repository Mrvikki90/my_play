import React from "react";
import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  // console.log("artistData", artistData);
  // console.log("songData", songData);


  function formatFollowerCount(count) {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return count;
    }
  }


  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={
            artistId
              ? artistData?.image?.[2]?.link
                  .replace("{w}", "500")
                  .replace("{h}", "500") ||
                artistData?.image?.[1]?.link
                  .replace("{w}", "500")
                  .replace("{h}", "500") ||
                artistData?.image?.[0]?.link
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : songData?.image?.[2]?.link ||
                songData?.image?.[1]?.link ||
                songData?.image?.[0]?.link
          }          
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData?.name : songData?.name}
          </p>
          <p className="text-base text-gray-400 mt-2">
            Likes {artistId ? formatFollowerCount(artistData?.followerCount) : ''}
          </p>
          <p className="text-base text-gray-400 mt-2">
            Fans {artistData ? formatFollowerCount(artistData?.fanCount) : ''}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
