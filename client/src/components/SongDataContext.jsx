import { createContext, useContext, useState } from "react";

const SongDataContext = createContext();

export function useSongDataContext() {

    return useContext(SongDataContext);
}

export function SongDataProvider({ children }) {

    const [song_info, setSongInfo] = useState(null);


    return (

        <SongDataContext.Provider value={song_info}>

            {children}
            {children}

        </SongDataContext.Provider>
    )
}

