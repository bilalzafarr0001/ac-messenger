import React, { useCallback } from "react";

const useGenerateToken = () => {
  const generateToken = useCallback(async (setToken, email, pass, setErrorMsg) => {
    try {
      let formData = new FormData();
      formData.append("username", email);
      formData.append("password", pass);

      // Request login from the API
      const fetchToken = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        body: formData,
      });

      const fetchTokenResults = await createToken.json();

      if (!fetchTokenResults.access_token) throw new Error(fetchTokenResults.detail);

      setToken(fetchTokenResults.access_token);
    } catch (error) {
      console.error(error.message);
      setErrorMsg(error.message)

      errorTimeout = setTimeout(() => setErrorMsg(null), 5000);
    }
  });

  return generateToken;
};

export default useGenerateToken;