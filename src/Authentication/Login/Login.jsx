import { useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputForm } from "../../Components";

import { UserContext } from "../../Contexts";

import { useLocalStorage } from "../../Hooks";

const Login = () => {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const userPassRef = useRef();

  const [user, setUser] = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      userNameRef.current.value === "admin" &&
      userPassRef.current.value === "admin"
    ) {
      navigate("/chatbox");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4">
      <form
        onClick={handleLogin}
        className="w-full sm:w-96 flex flex-col gap-4 p-12 rounded-xl bg-white shadow-lg "
      >
        <label className="text-2xl text-left text-center">Sign in</label>

        <InputForm
          label="Username"
          type="text"
          placeHolder="e.g example123"
          inputRef={userNameRef}
        />
        <InputForm
          label="Password"
          type="password"
          placeHolder="*********"
          inputRef={userPassRef}
        />
        <div className="flex flex-wrap gap-2 items-center">
          <input className="w-4" type="checkbox" />
          <label htmlFor="check-remember" className=" text-slate-500">
            Remember me
          </label>
          <a href="#" className="ml-0 md:ml-auto text-blue-500 ">
            Forgot password?
          </a>
        </div>

        <button className="bg-blue-500 hover:bg-blue-400 duration-300 rounded-xl p-2 px-4 text-white">
          Sign in
        </button>
        <p className="text-slate-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-400 duration-300 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
