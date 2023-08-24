import React from "react";
import AudioPlayer from "react-h5-audio-player";
import Styles from "./css/musicPlayer.module.css";
import Track from "./Track";

const MusicPlayer = (song) => {
  return (
    <>
      {/* <Track activeSong={song && song.song && song.song.song} /> */}
      <div className={`${Styles.music_player}`}>
        <AudioPlayer
          autoPlay={true}
          autoPlayAfterSrcChange={true}
          src={
            song &&
            song.song &&
            song.song.song &&
            song.song.song.downloadUrl[4].link
          }
          // onPlay={(e) => console.log("onPlay")}
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), #2a2a80)",
            backdropFilter: "blur(20px)",
          }}
        />
      </div>
    </>
  );
};

export default MusicPlayer;
