import { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { InputForm } from "../../Components";

import { Auth } from "../../Authentication";

import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks";

const SignUp = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  const [userInfo] = useLocalStorage("userInfo", {});
  const [userToken, setUserToken] = useLocalStorage("userToken", "");

  const navigate = useNavigate();

  console.log(userInfo.email, userInfo.password);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      console.log("creatingUser");

      const date = new Date();
      const timestamp = date.getTime();

      const userSignUpData = {
        username: userName,
        email: userEmail,
        password: userPass,
        status: true,
        is_active: true,
        profile: "default.png",
        websocket_id: timestamp.toString(),
      };

      const createUser = await fetch("http://127.0.0.1:8000/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSignUpData),
      });

      const createUserRes = await createUser.json();
      if (!createUserRes.id) throw new Error(createUserRes.detail[0].msg);

      // Requests for login
      let loginFormData = new FormData();
      loginFormData.append("username", userEmail);
      loginFormData.append("password", userPass);

      // Request login from the API
      const loginUser = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        body: loginFormData,
      });

      const loginResults = await loginUser.json();

      setUserToken(loginResults.access_token);

      if (!loginResults.access_token)
        throw new Error("Incorrect email or password");

      setIsAuthenticating(true);
    } catch (error) {
      setErrorMsg(error.message);

      console.error(error);
      const errorTimeout = setTimeout(() => setErrorMsg(null), 5000);
    }
  };

  useEffect(() => {
    if (userToken) {
      setIsAuthenticating(true);
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4">
      {isAuthenticating ? (
        <Auth
          setIsAuthenticating={setIsAuthenticating}
          setErrorMsg={setErrorMsg}
        />
      ) : (
        <form
          onSubmit={handleSignUp}
          className="w-full sm:w-96 flex flex-col gap-4 p-12 rounded-xl bg-white shadow-lg "
        >
          {" "}
          <label className="text-2xl text-left">Sign Up</label>
          {errorMsg && (
            <p className="bg-red-600/10 rounded-xl p-4 border border-red-500 text-red-600">
              {errorMsg}
            </p>
          )}
          <InputForm
            label="Email"
            type="email"
            placeHolder="e.g example@email.com"
            isControlled="true"
            invalidLabel="Please provide a valid Email Address"
            state={userEmail}
            setState={setUserEmail}
          />
          <InputForm
            label="Username"
            type="text"
            placeHolder="e.g example123"
            minLength="6"
            invalidLabel="Please use at least 6 characters for the username."
            isControlled="true"
            state={userName}
            setState={setUserName}
          />
          <InputForm
            label="Password"
            type="password"
            placeHolder="*********"
            minLength="8"
            invalidLabel="Please use at least 8 characters for the password."
            isControlled="true"
            state={userPass}
            setState={setUserPass}
          />
          <button className="bg-blue-500 hover:bg-blue-400 duration-300 rounded-xl p-2 px-4 text-white">
            Sign Up
          </button>
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-400 duration-300 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUp;