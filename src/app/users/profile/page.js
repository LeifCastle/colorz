"use client";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import handleLogout from "@/app/utils/handleLogout";
import axios from "axios";
import setAuthToken from "@/app/utils/setAuthToken";
import PageHeader from "../../../components/PageHeader";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //----Sets user expiration time
  const expirationTime = new Date(
    parseInt(localStorage.getItem("expiration")) * 1000
  );
  let currentTime = Date.now();

  //----Lougout user after expiration time is met
  if (currentTime >= expirationTime) {
    handleLogout();
    router.push("/users/login");
  }

  //----Handles user logout functionality
  function handleLogoutButton() {
    handleLogout();
    router.push("/"); //Redirect user to home page
    console.log("TokenZ: ", localStorage.getItem("jwtToken"));
  }

  useEffect(() => {
    if (typeof window != undefined) {
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
    <div className="">
      <PageHeader />
      <nav className="bg-slate-400">
        <a className="mr-4" href="/">
          Home
        </a>
        <button onClick={handleLogoutButton} href="">
          Logout
        </button>
      </nav>
      <div className="row gutters-sm">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {data.firstName} {data.lastName}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">{data.lastName}</div>
              </div>
              <hr />
              {/* Edit not implemented yet */}
              <div className="row">
                <div className="col-sm-12">
                  <a
                    className="btn btn-info "
                    target="__blank"
                    href="/users/edit"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
