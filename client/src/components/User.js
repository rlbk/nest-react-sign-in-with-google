import { googleLogout } from "@react-oauth/google";
import React from "react";
import { useStore } from "../hook/useStore";

const User = () => {
  const { authData, setAuthData } = useStore();
  return (
    <div className="container">
      {authData && (
        <>
          <h2>{authData.data.name}</h2>
          <p>{authData.data.email}</p>
          <img src={authData.data.image} alt="profile" />
          <button
            onClick={() => {
              googleLogout();
              localStorage.clear();
              setAuthData(null);
              window.location.reload();
            }}
          >
            log out
          </button>
        </>
      )}
    </div>
  );
};

export default User;
