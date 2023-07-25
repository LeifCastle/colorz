"use client";
import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import handleLogout from "../../utils/handleLogout";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import PageHeader from "../../../components/PageHeader";

export default function Account() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // ALso not working..logging user out when they nav to this page even if they just signed in
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

  useEffect(() => {
    if (typeof window !== undefined) {
      setAuthToken(localStorage.getItem("jwtToken"));
      if (localStorage.getItem("jwtToken")) {
        axios
          .get(
            `http://localhost:8000/users/email/${localStorage.getItem("email")}`
          )
          .then((response) => {
            // data is an object
            let userData = jwtDecode(localStorage.getItem("jwtToken"));
            if (userData.email === localStorage.getItem("email")) {
              setData(response.data.user[0]);
              setLoading(false);
            } else {
              router.push("/users/login");
            }
          })
          .catch((error) => {
            console.log(error);
            router.push("/users/login");
          });
      } else {
        router.push("/users/login");
      }
    }
  }, [router]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data shown...</p>;
  return (
    <div>
      <PageHeader />
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}
