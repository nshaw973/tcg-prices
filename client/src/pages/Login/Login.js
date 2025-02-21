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
  const [view, setView] = useState(false);

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
        <div className="card bg-white text-black w-fit shadow-xl flex mx-auto h-fit mt-8 w-5/6 sm:w-96 ">
          <div className="card-body">
            <strong className="border-b-2 border-black mb-2">Login</strong>
            <form
              className="flex flex-col justify-between"
              onSubmit={handleLogin}
            >
              {/* Discord ID */}
              <label className="input input-sm bg-white border-1 border-black flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  className="grow w-full"
                  id="userId"
                  type="text"
                  name="userId"
                  placeholder="Enter your Discord ID"
                  value={loginForm.userId}
                  onChange={handleChange}
                  required
                />
              </label>
              {/* Password */}
              <label className="input input-sm bg-white border-1 border-black flex items-center gap-2">
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
                  type={`${view ? "text" : "password"}`}
                  name="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                />
                {view ? (
                  /* Show Password */
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 opacity-70"
                    onClick={() => setView(false)}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></circle>{" "}
                    </g>
                  </svg>
                ) : (
                  /* Hide Password */
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 opacity-70"
                    onClick={() => setView(true)}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M2 2L22 22"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                )}
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
                <strong className="my-3 p-3 bg-danger bg-red-500 text-white rounded-xl animate-shake animate-twice animate-ease-linear">
                  {error.message}
                </strong>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
