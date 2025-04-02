import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { notifyError } from "../../../helper/helper";
import { registerUser } from "../../../redux/action/auth";
import { useDispatch, useSelector } from "react-redux";

function SignupPage() {
  const dispatch=useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const {loading}=useSelector((state)=>state.loading)
  
  const checkValidation = () => {
    if (
      password === "" ||
      confirmPassword === "" ||
      phoneNumber === "" ||
      emailId === "" ||
      name === ""
    ) {
      return true;
    }
    return false;
  };

  const loginWithName = (e) => {
    e.preventDefault();
    if (phoneNumber?.length !== 10) {
      return notifyError("Phone Number must be 10 digit.");
    }
    if (password !== confirmPassword) {
      return notifyError("Password do not match with confirm password");
    }
    dispatch(registerUser( name, emailId, password,phoneNumber));
  };

  return (
    <div className="auth-from slide-in p-1" style={{ width: "700px" }}>
      <div>
        <div className="flex justify-center ">
          <img src="/images/note-book.jpeg" alt="logo" className="note-logo" />
        </div>

        <h3
          className="margin-0px flex justify-center mt-1"
          style={{ color: "purple" }}
        >
          Sign Up To Note Taking
        </h3>

        <div className="">
          <form className="mt-1 " onSubmit={loginWithName}>
            <div className="input-field-style">
              <span className="material-symbols-outlined primary">person</span>
              <input
                className="browser-default "
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-field-style">
              <span className="material-symbols-outlined primary">email</span>
              <input
                className="browser-default "
                placeholder="Enter your Email Id"
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <div className="input-field-style">
              <span className="material-symbols-outlined primary">phone</span>
              <input
                className="browser-default "
                placeholder="Enter your Phone Number"
                type="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
            <div className="input-field-style">
              <span className="material-symbols-outlined primary ">lock</span>
              <input
                className="browser-default input-field "
                placeholder="Enter your Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                style={{ width: "25px" }}
              >
                {showConfirmPassword ? (
                  <AiFillEye className="eye-icon" />
                ) : (
                  <AiFillEyeInvisible className="eye-icon" />
                )}
              </div>
            </div>

            <div className="submit-btn mv-2 column flex align-center ">
              <button
                className={`btn full-width mb-1 mt-1 ${
                  checkValidation() ? "disable-btn" : "enable-btn"
                }`}
                type="submit"
                disabled={checkValidation()}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Sign Up"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-1">
          <p className="semi-bold">
            You have an account?
            <Link to={"/"}>
              <span className="primary pointer"> Log In</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
