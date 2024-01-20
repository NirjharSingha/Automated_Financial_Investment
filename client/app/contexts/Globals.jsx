"use client";

import React, { createContext, useContext, useState } from "react";

const GlobalsContext = createContext();

export function useGlobals() {
  return useContext(GlobalsContext);
}

const GlobalsProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(2000);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [selected, setSelected] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [shouldFetchAccount, setShouldFetchAccount] = useState(true);

  return (
    <GlobalsContext.Provider
      value={{
        windowWidth,
        setWindowWidth,
        isLoggedIn,
        setIsLoggedIn,
        showProfile,
        setShowProfile,
        selected,
        setSelected,
        accounts,
        setAccounts,
        shouldFetchAccount,
        setShouldFetchAccount,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsProvider;
