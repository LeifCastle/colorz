"use client";
import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import handleLogout from "../../utils/handleLogout";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import PageHeader from "../../../components/PageHeader";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export default function Account() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== undefined) {
      setAuthToken(localStorage.getItem("jwtToken"));
      if (localStorage.getItem("jwtToken")) {
        axios
          .get(`${BASE_URL}/users/email/${localStorage.getItem("email")}`)
          .then((response) => {
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

  //Prevent's tiny visual header "refresh" while data is being aquired
  if (isLoading || !data) return <PageHeader />;

  return (
    <div>
      <PageHeader />
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}
