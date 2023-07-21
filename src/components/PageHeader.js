"use client";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function PageHeader() {
  const [signup_login, setSignup_login] = useState("login");

  useEffect(() => {
    //----Sets user expiration time
    if (typeof window !== undefined) {
      if (localStorage.getItem("jwtToken")) {
        setSignup_login("profile");
      } else {
        setSignup_login("login");
      }
    }
  }, []);

  //Capitalize login/profile (needs to be lower case because its also used to define a route)
  let array = signup_login.split("");
  let login_profile = [
    array[0].toUpperCase(),
    ...array.slice(1, array.length),
  ].join("");

  return (
    <div
      className={`flex items-center justify-center h-headerH pb-1 border-b-[1px] border-[#4C4C4C] bg-pageHBg text-white text-4xl font-header`}
    >
      <div className="basis-1/3 flex justify-center items-center">
        <h1 className="pr-10">Colorz</h1>
        <Link href="/" className="text-base pt-1">
          Home
        </Link>
        <span className="ml-3 mr-3 text-base text-bold text-gray-400 pt-1">
          |
        </span>
        <Link href={`/users/${signup_login}`} className="text-base pt-1">
          {login_profile}
        </Link>
      </div>
      <div className="basis-2/3"></div>
    </div>
  );
}
