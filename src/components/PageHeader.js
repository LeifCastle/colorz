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

  return (
    <div className="flex items-center justify-center h-headerH bg-slate-700 text-white text-2xl">
      <div className="basis-1/3">
        <Link
          href="/"
          className="border-white border-2 rounded-md ml-10 text-base pl-1 pr-1"
        >
          Home
        </Link>
      </div>
      <div className="basis-1/3 flex justify-center">
        <h1>Colorz</h1>
      </div>
      <div className="basis-1/3">
        {
          <Link
            href={`/users/${signup_login}`}
            className="border-white border-2 rounded-md ml-10 text-base pl-1 pr-1"
          >
            {signup_login}
          </Link>
        }
      </div>
    </div>
  );
}
