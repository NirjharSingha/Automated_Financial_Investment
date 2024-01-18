import React from "react";
import { useGlobals } from "../contexts/Globals";

const Drawer = () => {
  const { setShowProfile, isLoggedIn, selected, setSelected } = useGlobals();

  return (
    <div
      className="w-52 shadow-xl p-4 pt-6 pl-2 pr-2 fixed top-[4rem] left-0 overflow-y-auto z-10 scrollNone bg-gray-300"
      style={{
        height: "calc(100svh - 4rem)",
        boxShadow: "3px 0 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <button
        className="w-full pl-1 pr-1 mb-3 truncate rounded-lg bg-blue-300 h-[3rem] hover:bg-blue-400 text-white font-bold font-serif"
        style={
          selected === "home" ? { backgroundColor: "rgb(2, 164, 251)" } : {}
        }
        onClick={() => {
          setSelected("home");
        }}
      >
        Home
      </button>
      {isLoggedIn && (
        <>
          <button
            className="w-full pl-1 pr-1 mb-3 truncate rounded-lg bg-blue-300 h-[3rem] hover:bg-blue-400 text-white font-bold font-serif"
            onClick={() => {
              setShowProfile((prev) => !prev);
              setSelected("profile");
            }}
            style={
              selected === "profile"
                ? { backgroundColor: "rgb(2, 164, 251)" }
                : {}
            }
          >
            Profile
          </button>
          <button
            className="w-full pl-1 pr-1 mb-3 truncate rounded-lg bg-blue-300 h-[3rem] hover:bg-blue-400 text-white font-bold font-serif"
            onClick={() => {
              setSelected("accounts");
            }}
            style={
              selected === "accounts"
                ? { backgroundColor: "rgb(2, 164, 251)" }
                : {}
            }
          >
            Accounts
          </button>
          <button
            className="w-full pl-1 pr-1 mb-3 truncate rounded-lg bg-blue-300 h-[3rem] hover:bg-blue-400 text-white font-bold font-serif"
            onClick={() => {
              setSelected("bills");
            }}
            style={
              selected === "bills"
                ? { backgroundColor: "rgb(2, 164, 251)" }
                : {}
            }
          >
            Bills
          </button>
          <button
            className="w-full pl-1 pr-1 mb-3 truncate rounded-lg bg-blue-300 h-[3rem] hover:bg-blue-400 text-white font-bold font-serif"
            onClick={() => {
              setSelected("investments");
            }}
            style={
              selected === "investments"
                ? { backgroundColor: "rgb(2, 164, 251)" }
                : {}
            }
          >
            Investments
          </button>
        </>
      )}
    </div>
  );
};

export default Drawer;
