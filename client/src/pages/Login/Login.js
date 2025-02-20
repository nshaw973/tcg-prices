import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../../utils/mutations";
import { Loading } from "../../components/index";
import Auth from "../../utils/auth";

const Login = () => {
  const [loginForm, setLoginState] = useState({
    userId: "",
    password: "",
  });

  const [login, { error, data, loading }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginState({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...loginForm },
      });
      console.log(data);

      Auth.login(data.login.token);

      setLoginState({
        userId: "",
        password: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full h-full">
      {loading ? (
        <>
          <Loading />
        </>
      ) : data ? (
        <p>
          Success! You can head <Link to="/">back to the homepage.</Link>
          <span className="loading loading-bars loading-lg"></span>
        </p>
      ) : (
        <div className="card bg-base-100 w-fit shadow-xl flex mx-auto h-fit mt-8">
          <div className="card-body">
            <h1 className="text-c">Login</h1>
            <form
              className="flex flex-col justify-between"
              onSubmit={handleLogin}
            >
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  className="grow w-96"
                  id="userId"
                  type="text"
                  name="userId"
                  placeholder="Enter your Discord ID"
                  value={loginForm.userId}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="grow"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Log In
                </button>
              </div>
              {error && (
                <div className="my-3 p-3 bg-danger text-white rounded-xl">
                  {error.message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
