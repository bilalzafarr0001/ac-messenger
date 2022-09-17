import React, { useEffect, useState } from "react";

import { InputForm, TwButton } from "components";
import { useAppDispatch } from "app/hooks";
import { createAccount } from "./userSlice";

const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,17}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=).{8,24}$/;

interface SignUpProps {
  setPendingMsg: (state: string) => void;
  setIsSigningIn: (state: boolean) => void;
  pendingMsg: string;
}

const SignUp = ({ setPendingMsg, setIsSigningIn, pendingMsg }: SignUpProps) => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [validDisplayName, setValidDisplayName] = useState(false);
  const [displayNameFocus, setDisplayNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useAppDispatch();

  const handleSignUp = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!validEmail || !validDisplayName || !validPassword)
        throw new Error("Invalid Entry.");

      dispatch(
        createAccount({
          email,
          password,
          displayName,
          photoURL: DEFAULT_PROFILE_IMAGE,
        })
      );
    } catch (error: any) {
      setErrorMsg(error.message);
      setPendingMsg("");
      console.error(error);
    }
  };

  useEffect(() => setErrorMsg(""), [email, displayName, password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidDisplayName(USER_REGEX.test(displayName));
  }, [displayName]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConfirmPwd(password === confirmPwd);
  }, [password, confirmPwd]);

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      {" "}
      <div className="flex flex-col gap-1">
        <label className="text-3xl font-semibold text-center text-black dark:text-white">
          Create account
        </label>
        <label className="text-sm text-muted-light dark:text-muted-dark text-center mb-4">
          Fill up the form
        </label>
      </div>
      <p
        className={`text-red-600 text-md text-center ${
          errorMsg ? "visible block" : "absolute invisible"
        }`}
      >
        {errorMsg}
      </p>
      <InputForm
        label="Email"
        type="email"
        state={email}
        setState={setEmail}
        stateFocus={emailFocus}
        setStateFocus={setEmailFocus}
        placeholder="e.g example@email.com"
        isValid={validEmail}
        instruction="Should be a valid email."
      />
      <InputForm
        label="Display Name"
        type="text"
        state={displayName}
        setState={setDisplayName}
        stateFocus={displayNameFocus}
        setStateFocus={setDisplayNameFocus}
        placeholder="e.g example123"
        isValid={validDisplayName}
        instruction="Must be 4 to 18 characters and begins with letter. Hyphen, Spaces and underscore are allowed"
      />
      <InputForm
        label="Password"
        type="password"
        state={password}
        setState={setPassword}
        stateFocus={passwordFocus}
        setStateFocus={setPasswordFocus}
        placeholder="*********"
        isValid={validPassword}
        instruction="8 to 24 characters and must include upper and lower case characters."
      />
      <InputForm
        label="Confirm Password"
        type="password"
        placeholder="*********"
        state={confirmPwd}
        setState={setConfirmPwd}
        stateFocus={confirmPwdFocus}
        setStateFocus={setConfirmPwdFocus}
        isValid={validConfirmPwd}
        instruction="Should match the first password."
      />
      <TwButton
        type="submit"
        disabled={
          !validEmail || !validDisplayName || !validConfirmPwd || pendingMsg
            ? true
            : false
        }
      >
        Sign Up
      </TwButton>
      <p className="text-muted-light dark:text-muted-dark text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setIsSigningIn(true)}
          className="text-primary-shaded cursor-pointer hover:text-primary-tinted duration-300 font-semibold"
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default SignUp;
