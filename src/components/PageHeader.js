"use client";
import handleLogout from "../app/utils/handleLogout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function PageHeader() {
  const [signup_login, setSignup_login] = useState("account");
  const [logout, setLogout] = useState();
  const [myThemes, setMyThemes] = useState();
  const router = useRouter();

  //----Handles user logout functionality
  function handleLogoutButton() {
    handleLogout();
    router.push("/"); //Redirect user to home page
  }

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setSignup_login("account");
      setLogout(
        <button onClick={handleLogoutButton} href="/">
          Logout
        </button>
      );
      setMyThemes(
        <>
          <Link href={`/users/my_themes`} className="text-base pt-1">
            My Themes
          </Link>
          <span className="ml-3 mr-3 text-base text-bold text-gray-400 pt-1">
            |
          </span>
        </>
      );
    } else {
      setSignup_login("login");
      setLogout();
      setMyThemes();
    }
  }, [handleLogoutButton]);

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
        <h1 className="pl-20 pr-10">Colorz</h1>
        <Link href="/" className="text-base pt-1">
          Home
        </Link>
        <span className="ml-3 mr-3 text-base text-bold text-gray-400 pt-1">
          |
        </span>
        {myThemes}
        <Link href={`/users/${signup_login}`} className="text-base pt-1">
          {login_profile}
        </Link>
      </div>
      <div className="basis-2/3">
        <div className="text-base text-end mr-10">{logout}</div>
      </div>
    </div>
  );
}
