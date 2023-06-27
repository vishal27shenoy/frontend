import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/regandlogin.css";
import AuthContext, { UserContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginandRegistration = () => {
  const { auth, setAuth } = useContext(UserContext);
  const [change, setchange] = useState(true);
  const navigate = useNavigate();
  const [regdata, setRegdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [logdata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleRegistration = async () => {
    if (
      regdata.username &&
      regdata.email &&
      regdata.password === regdata.confirmPassword
    ) {
      delete regdata.confirmPassword;
      console.log(regdata);
      const response = await axios.post(
        "https://notesapp-ip0q.onrender.com/api/auth/register",
        regdata
      );
      if (response.status === 200) {
        setchange(true);
      }
    } else {
      toast.warn("Invalid Details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleLogin = async () => {
    // setAuth({ name: "uglu", email: "hjjhj", token: "biglu" });

    if (logdata.email && logdata.password) {
      const response = await axios.post(
        "https://notesapp-ip0q.onrender.com/api/auth/login",
        logdata
      );
      if (response.status === 200) {
        console.log(response);
        const str = JSON.stringify({
          id: response.data.payload._id,
          username: response.data.payload.username,
          email: response.data.payload.email,
          token: response.data.token,
        });
        Cookies.set("token", str, { expires: 7 });
        setAuth({
          id: response.data.payload._id,
          username: response.data.payload.username,
          email: response.data.payload.email,
          token: response.data.token,
        });
        navigate("/home");
      } else {
        toast.error("Invalid Credentials", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.warn("Insert Details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  console.log(auth);
  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="login_and_registration_container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {change ? (
        <div className="login_container">
          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) =>
              setLoginData({ ...logdata, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) =>
              setLoginData({ ...logdata, password: e.target.value })
            }
          />
          <button onClick={() => handleLogin()}>Login</button>
          <span className="login_span" onClick={() => setchange(!change)}>
            New Here ?{" "}
          </span>
        </div>
      ) : (
        <div className="registration_container">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setRegdata({ ...regdata, username: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setRegdata({ ...regdata, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setRegdata({ ...regdata, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) =>
              setRegdata({ ...regdata, confirmPassword: e.target.value })
            }
          />
          <button onClick={() => handleRegistration()}>Register</button>
          <span
            className="registration_span"
            onClick={() => setchange(!change)}
          >
            Already Here ?{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default LoginandRegistration;
