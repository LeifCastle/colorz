"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import PageHeader from "../../../components/PageHeader";

export default function Login() {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //----Input event handlers
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //----Form submit event handler
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default html form refresh
    //Change post address to .env variable
    //----Sets user expiration time
    if (typeof window !== undefined) {
      axios
        .post(`${process.env.API}/users/login`, {
          email,
          password,
        })
        .then((response) => {
          console.log("R:", response);
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("email", response.data.userData.email);
          localStorage.setItem("expiration", response.data.userData.exp);
          setAuthToken(response.data.token);
          let decoded = jwtDecode(response.data.token);
          setRedirect(true);
        })
        .catch((error) => {
          console.log("E:", error);
          setError(error.response.data.message);
        });
    }
  };

  //----If user succesfully logs in redirect them to their profile page
  if (redirect) {
    router.push("/users/my_themes");
  }

  //----If user does not succesfully log in display error
  if (error != false) {
    return (
      <div className="createError flex-col items-center bg-slate-400">
        <p>{error}</p>
        <div>
          <a href="/users/login" type="button" className="bg-slate-600 mt-3">
            Login
          </a>
          <span> </span>
          <a href="/users/signup" type="button" className="bg-slate-600 mt-3">
            Signup
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader />
      <div className="text-black">
        <form
          className=" inputs flex-col items-center bg-slate-500"
          onSubmit={handleSubmit}
        >
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <div className="inputs flex-col gap-2 items-center">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
              required
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              alue={password}
              onChange={handlePassword}
              required
            />
          </div>
          <div className="row">
            <button type="submit" className="bg-slate-600 px-4">
              Login
            </button>
          </div>
          <br />
          <h2>Don&apos;t have an account? Sign Up Now!</h2>
          <a href="/users/signup" type="button" className="bg-slate-600 mt-3">
            Register Now!
          </a>
        </form>
      </div>
    </>
  );
}
