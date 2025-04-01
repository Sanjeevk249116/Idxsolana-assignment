import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useRef } from "react";

function LoginComponent() {
  // const dispatch = useDispatch();
  const email_ref = useRef()
  //   const { loading } = useSelector((state) => state.account);
  const loading = false;
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const checkValidation = () => {
    if (email === "" || password === "") {
      return true;
    }
    return false;
  };

  const loginWithEmail = (e) => {
    e.preventDefault();

    // dispatch(loginUser(email, password));
  };

  useEffect(() => {
    email_ref.current.focus();
  }, []);

  return (
    <div className="" style={{ width: "700px" }}>
      <div>
        <div className="flex justify-center ">
          <img src="/images/note-book.jpeg" alt="logo" className="note-logo" />
        </div>

        <h3 className="flex justify-center" style={{ color: "purple" }}>
          Sign In To Note Taking Application
        </h3>

        <div className="p-1">
          <form className="" onSubmit={loginWithEmail}>
            <div className="input-field-style">
              <span className="material-symbols-outlined primary">person</span>
              <input
                ref={email_ref}
                className="browser-default "
                placeholder="Enter your email or phone Number"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-field-style">
              <span className="material-symbols-outlined primary ">lock</span>
              <input
                className="browser-default input-field "
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                style={{ width: "25px" }}
              >
                {showPassword ? (
                  <AiFillEye className="eye-icon" />
                ) : (
                  <AiFillEyeInvisible className="eye-icon" />
                )}
              </div>
            </div>

            <div
              className={`submit-btn mt-1 column valign-wrapper justify-center ${
                checkValidation() ? "disable-btn" : "enable-btn"
              }`}
            >
              <button
                className="btn full-width p-1 "
                type="submit"
                disabled={checkValidation()}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Sign In"}
              </button>
            </div>
          </form>
        </div>

        <div className="">
          {/* <p className="semi-bold">
            Forgot password?<span className="primary"> Reset Password</span>{" "}
          </p> */}
          <p className="semi-bold">
            Don't have an account?
            <Link to={"/signup"}>
              <span className="primary pointer"> Sign Up</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
