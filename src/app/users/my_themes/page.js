"use client";
import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import handleLogout from "../../utils/handleLogout";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import PageHeader from "../../../components/PageHeader";
import UserThemes from "../../../components/UserThemes";

export default function Account() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [themes, setThemes] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  function handleDeleteTheme(theme) {
    //is this if statement really necessary?
    if (loggedIn) {
      axios
        .delete(`${BASE_URL}/themes/${theme}`, {
          data: { user: localStorage.getItem("email") },
        })
        //Update theme state to reflect deleted theme
        .then((response) => {
          setThemes([...response.data.themes]);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"));
    if (localStorage.getItem("jwtToken")) {
      axios
        .get(`${BASE_URL}/users/email/${localStorage.getItem("email")}`)
        .then((response) => {
          // data is an object
          let userData = jwtDecode(localStorage.getItem("jwtToken"));
          if (userData.email === localStorage.getItem("email")) {
            setData(response.data.user[0]);
            setLoading(false);
            setLoggedIn(true);
          } else {
            router.push("/users/login");
          }
        })
        .catch((error) => {
          console.log(error);
          router.push("/users/login");
          setLoggedIn(false);
        });
      //Theme Data
      axios
        .get(`${BASE_URL}/themes/${localStorage.getItem("email")}`)
        .then((response) => {
          setThemes([...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      router.push("/users/login");
      setLoggedIn(false);
    }
  }, [router]);

  //Prevent's tiny visual header "refresh" while data is being aquired
  if (isLoading || !data) return <PageHeader />;

  return (
    <div className="">
      <PageHeader />
      <div>
        My Themes:
        <UserThemes themes={themes} handleDeleteTheme={handleDeleteTheme} />
      </div>
    </div>
  );
}
