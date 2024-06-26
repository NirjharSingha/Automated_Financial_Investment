"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

// npm install @react-oauth/google
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGlobals } from "../contexts/Globals";

const Login = ({ setShowLogin, setShowSignUp }) => {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [warning, setWarning] = useState("");
  const [email, setEmail] = useState("");
  const containerRef = useRef(null);
  const { setIsLoggedIn } = useGlobals();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoggedIn(true);
    setShowLogin(false);
    // const res = await fetch("http://localhost:5000/api/v1/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    //   credentials: "include",
    // });
    // const data = await res.json();
    // if (data.status === "success") {
    //   setIsLoggedIn(true);
    //   setShowLogin(false);
    // } else {
    //   setWarning(data.message);
    // }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowLogin(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <form
      className="p-7 bg-purple-300 z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl mt-[2rem] min-w-[25rem]"
      style={{ boxShadow: "-3px 5px 5px rgba(0, 0, 0, 0.3)" }}
      ref={containerRef}
    >
      <button
        type="button"
        className="btn btn-circle btn-outline absolute right-1 top-1"
        onClick={() => setShowLogin(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex justify-center items-center mb-3 mt-2">
        <BsFillPersonFill className="mr-2 text-3xl text-gray-700" />
        <p className="font-serif text-2xl font-bold text-gray-700">Log in</p>
      </div>
      <input
        type="email"
        className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full mb-4 outline-none p-1 font-sans cursor-pointer bg-purple-300"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setWarning("");
          setEmail(e.target.value);
        }}
      />
      <div className="p-1 flex items-center indent-2 rounded-2xl bg-purple-300 border-b-2 rounded-b-none">
        <input
          id="password"
          name="password"
          type={showPass ? "text" : "password"}
          className="indent-2 rounded border-none outline-none cursor-pointer w-full font-sans bg-purple-300"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setWarning("");
            setPassword(e.target.value);
          }}
        />
        {!showPass && (
          <AiFillEye
            className="w-8 h-5 cursor-pointer text-gray-700"
            onClick={() => setShowPass((prev) => !prev)}
          />
        )}
        {showPass && (
          <AiFillEyeInvisible
            className="w-8 h-5 cursor-pointer text-gray-700"
            onClick={() => setShowPass((prev) => !prev)}
          />
        )}
      </div>
      <p className="font-sans text-sm text-red-600 w-full text-center mt-2">
        {warning}
      </p>
      <button
        className="w-full h-8 bg-white font-sans font-bold mt-2 rounded-2xl hover:bg-gray-400 text-gray-700"
        onClick={handleLogin}
      >
        Log in
      </button>
      <div className="font-sans text-sm w-full text-center mt-3 text-gray-700">
        Don't have an account?
        <span
          className="font-bold ml-1 hover:underline cursor-pointer text-gray-700"
          onClick={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
        >
          Register
        </span>
      </div>
      <div className="mt-2 rounded-3xl overflow-hidden">
        <GoogleOAuthProvider
        // clientId={import.meta.env.VITE_CLIENT_ID}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const details = jwtDecode(credentialResponse.credential);
              // handleGoogleAuth(details);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </form>
  );
};

export default Login;
