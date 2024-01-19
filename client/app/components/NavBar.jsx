"use client";

import React from "react";
import { useEffect, useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import Drawer from "./Drawer";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Image from "next/image";
import { useGlobals } from "../contexts/Globals";
import FinanceIcon from "@/public/financeIcon.svg";

const NavBar = () => {
  const { windowWidth, setWindowWidth, showProfile, isLoggedIn } = useGlobals();
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      {showLogin && (
        <Login setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
      )}
      {showSignUp && (
        <SignUp setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />
      )}
      {showProfile && <Profile />}
      <div
        className="navbar h-[4rem] bg-base-100 sticky"
        style={{ backgroundColor: "rgb(183, 203, 203)" }}
      >
        <div className="flex items-center ml-8 navbar-start">
          {/* {!showDrawer && (
            <RxHamburgerMenu
              className="font-black text-xl mr-2 cursor-pointer"
              onClick={() => setShowDrawer(true)}
            />
          )}
          {showDrawer && (
            <RxCross1
              className="font-black text-xl ml-2 mr-8 cursor-pointer"
              onClick={() => setShowDrawer(false)}
            />
          )}
          {showDrawer && <Drawer />} */}
          {/* <Drawer /> */}
          <div className="bg-yellow-50 p-[0.35rem] flex justify-center items-center mr-2 rounded-full border-2 border-solid border-white">
            <Image src={FinanceIcon} alt="logo" width={30} />
          </div>
          <a className="btn btn-ghost text-xl">InvestIQ</a>
        </div>
        <div className="navbar-end mr-8 flex items-center">
          {!isLoggedIn ? (
            <>
              <button
                className="p-1 pl-4 pr-4 rounded-lg bg-slate-50 mr-2 text-sm font-bold hover:bg-purple-400"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                className="p-1 pl-2 pr-2 rounded-lg bg-slate-50 text-sm font-bold hover:bg-purple-400"
                onClick={() => setShowSignUp(true)}
              >
                SignUp
              </button>
            </>
          ) : (
            <button
              className="p-1 pl-4 pr-4 rounded-lg bg-slate-50 mr-2 text-sm font-bold hover:bg-purple-400"
              onClick={() => (window.location.href = "http://localhost:3000")}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
