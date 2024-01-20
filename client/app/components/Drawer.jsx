"use client";

import React from "react";
import { useGlobals } from "../contexts/Globals";
import Link from "next/link";
import { useEffect } from "react";

const Drawer = () => {
  const { setShowProfile, isLoggedIn, selected, setSelected } = useGlobals();
  useEffect(() => {
    const array = window.location.href.split("/");
    if (array.length >= 4) {
      if (array[3] === "") {
        setSelected("home");
      } else if (array[3] == "accounts") {
        setSelected("accounts");
      } else if (array[3] == "bills") {
        setSelected("bills");
      } else if (array[3] == "investments") {
        setSelected("investments");
      }
    }
  }, []);

  return (
    <div
      className="w-52 shadow-xl p-4 pt-6 pl-2 pr-2 fixed top-[4rem] left-0 overflow-y-auto z-10 scrollNone bg-gray-300"
      style={{
        height: "calc(100svh - 4rem)",
        boxShadow: "3px 0 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Link href="/">
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
      </Link>

      <>
        <button
          className="w-full pl-1 pr-1 mb-3 truncate rounded-lg bg-blue-300 h-[3rem] hover:bg-blue-400 text-white font-bold font-serif"
          onClick={() => {
            setShowProfile((prev) => !prev);
          }}
          style={
            selected === "profile"
              ? { backgroundColor: "rgb(2, 164, 251)" }
              : {}
          }
        >
          Profile
        </button>
        <Link href="/accounts">
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
        </Link>
        <Link href="/bills">
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
        </Link>
        <Link href="/investments">
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
        </Link>
      </>
    </div>
  );
};

export default Drawer;
