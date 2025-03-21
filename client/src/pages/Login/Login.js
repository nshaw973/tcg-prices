import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../../utils/mutations";
import { Loading } from "../../components/index";
import Auth from "../../utils/auth";
import { iconHide, iconView, iconUser, iconKey, } from "../../images";

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
  useEffect(()=> {
    if(Auth.loggedIn()) {
      const me = Auth.getProfile().data
      window.location.assign(`/collection/${me.userId}`)
    }
  })

  return (
    <div className="w-full h-full">
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="card bg-white text-black w-fit shadow-xl flex mx-auto h-fit mt-8 w-5/6 sm:w-96 ">
          <div className="card-body text-black">
            <strong className="border-b-2 border-black pb-2 mb-2 text-lg">Login</strong>
            <form
              className="flex flex-col justify-between"
              onSubmit={handleLogin}
            >
              {/* Discord ID */}
              <label className="input input-sm bg-white border-1 border-black flex items-center gap-2 mb-2">
              <img src={iconUser} className="h-4 w-4 opacity-70" alt=""/>
                <input
                  className="grow w-full bg-transparent"
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
                <img src={iconKey} className="h-4 w-4 opacity-70" alt=""/>
                <input
                  className="grow bg-transparent"
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
                    <img
                      src={iconView}
                      className="h-4 w-4 opacity-70 cursor-pointer"
                      alt=""
                      onClick={() => setView(false)}
                    />
                ) : (
                  /* Hide Password */
                    <img
                      src={iconHide}
                      className="h-4 w-4 opacity-70 cursor-pointer"
                      alt=""
                      onClick={() => setView(true)}
                    />
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
            <div>
              <p> In Discord, run "/view-credentials" for your ID and password</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
