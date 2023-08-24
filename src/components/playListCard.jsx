import React from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from 'react-redux';
import { useDataContext } from "../context/dataContext";

import PlayPause from "./PlayPause";
// import { playPause, setActiveSong } from "../redux/features/playerSlice";

const PlayListCard = ({ song, data, i }) => {

    const { setSelectedId, selectedId, setActiveSong, activeSong } = useDataContext();


    // const dispatch = useDispatch();

    // const handlePauseClick = () => {
    //   dispatch(playPause(false));
    // };

    const handlePlayClick = () => {
        setActiveSong({ song, data, i })
        // dispatch(playPause(true));
    };

    const isSongKeyIdValid = /^[0-9]+$/.test(song.id);
    const link = isSongKeyIdValid ? `/playList/${song.name}` : `/songs/${song.id}`;

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="relative w-full h-56 group">
                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                    <PlayPause
                        // isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        // handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                    />
                </div>
                <img
                    alt="song_img"
                    src={song.image[2]?.link}
                    className="w-full h-full rounded-lg"
                />
            </div>

            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-white truncate">
                    <Link to={`/playlist/${song.id}`}>{song.name ? song.name : song.title}</Link>
                </p>
                <p className="text-sm truncate text-gray-300 mt-1">
                    {song.primaryArtists ? song.primaryArtists : song.type}
                    <Link
                        to={
                            song.primaryArtists
                                ? `/artists/${song?.primaryArtists.split(",").shift()}`
                                : "/top-artist"
                        }
                    ></Link>
                </p>
            </div>
        </div>
    );
};

export default PlayListCard;