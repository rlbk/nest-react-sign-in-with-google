import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useStore } from "./hook/useStore";
import axios from "axios";
import User from "./components/User";
const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const setAuthData = useStore((state) => state.setAuthData);
  return (
    <div className="App">
      {!useStore((state) => state.authData) ? (
        <>
          {" "}
          <h1>Welcome.</h1>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              useOneTap={true}
              onSuccess={async (credentialResponse) => {
                const { data } = await axios.post(
                  "http://localhost:8080/login",
                  {
                    token: credentialResponse.credential,
                  }
                );
                localStorage.setItem("AuthData", JSON.stringify(data));
                setAuthData(data);
              }}
              onError={() => {}}
            />
          </GoogleOAuthProvider>
        </>
      ) : (
        <>
          <h1>Google Sign in</h1>
          <User />
        </>
      )}
    </div>
  );
}

export default App;
