import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { freeMode } from "swiper";
import PlayPause from "./PlayPause";
import { useDataContext } from "../context/dataContext";

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

const TopPlay = () => {
  const [topCharts, setTopCharts] = useState();
  const [topArtists, setTopArtists] = useState();
  const swiperRef = useRef(null);
  const { setSelectedId, selectedId, setActiveSong, activeSong } =
    useDataContext();

  // const swiper = new Swiper('.swiper');

  // const dispatch = useDispatch();
  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data } = useGetTopChartsQuery();

  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };

  useEffect(() => {
    const getTopCharts = async () => {
      const response = await axios.get(
        "https://saavn.dev/api/search/songs?query=slowed+reverb+latest&page=1&limit=5"
      );
      console.log("charts response: ", response.data.data);
      if (response.data.data) {
        setTopCharts(response.data.data.results);
      }
    };
    getTopCharts();
  }, []);

  const handlePlayClick = (song, i) => {
    setActiveSong({ song, topCharts, i });
  };

  useEffect(() => {
    const getTopArtists = async () => {
      const response = await axios.get(
        "https://saavn.dev/api/search/artists?query=top-artist"
      );
      if (response.data.data) {
        setTopArtists(response.data.data.results);
      }
    };
    getTopArtists();
  }, []);

  const initOwlCarousel = (el) => {
    if (typeof el === "function") {
      el.on("initialized", () => {
      });
    }
  };

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };

  // const handlePlayClick = (song, i) => {
  //   dispatch(setActiveSong({ song, data, i }));
  //   dispatch(playPause(true));
  // };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Slowed And Reverbs</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topCharts?.map((song, i) => (
            <TopChartCard
              key={song.id}
              song={song}
              i={i}
              activeSong={activeSong}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          className="mt-4"
        >
          {topArtists &&
            topArtists.map((artist) => (
              <SwiperSlide
                key={artist?.id}
                style={{ width: "25%", height: "auto" }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${artist?.id}`}>
                  <img
                    src={artist?.image?.[2]?.url || artist?.image?.[1]?.url || artist?.image?.[0]?.url }
                    alt="Name"
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* </OwlCarousel> */}
      </div>
    </div>
  );
};

export default TopPlay;
