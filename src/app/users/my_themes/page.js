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

  //--This is preventing users from loggin in not quite sure the nature or scope of the error but i think its only a problem if they haven't signed in on that browerser session once already
  // //----Sets user expiration time
  // if (typeof window !== undefined) {
  //   const expirationTime = new Date(
  //     parseInt(localStorage.getItem("expiration")) * 1000
  //   );
  //   let currentTime = Date.now();

  //   //----Lougout user after expiration time is met
  //   if (currentTime >= expirationTime) {
  //     handleLogout();
  //     router.push("/users/login");
  //   }
  // }

  function handleDeleteTheme(theme) {
    //is this if statement really necessary?
    if (loggedIn) {
      axios
        .delete(`${process.env.API}/themes/${theme}`, {
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
        .get(`${process.env.API}/users/email/${localStorage.getItem("email")}`)
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
        .get(`${process.env.API}/themes/${localStorage.getItem("email")}`)
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

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data shown...</p>;
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
