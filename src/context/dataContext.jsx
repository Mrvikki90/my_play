import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  const [track, setTrack] = useState(null);
  const [activeSong, setActiveSong] = useState(null);

  return (
    <DataContext.Provider
      value={{
        selectedId,
        setSelectedId,
        track,
        setTrack,
        activeSong,
        setActiveSong,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
