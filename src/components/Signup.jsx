import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const go = "https://myaccount.google.com/";

  //   the jsx for allowign a new account opeinng with gmail
  const googleSignin = () => {
    // (window.location.href = go), "_blank";
    window.open(go, "_blank");
  };

  //   very important to naigate your route
  const navigate = useNavigate();
  const Login = () => {
    navigate("/Login");
  };

  //   using usestate
  const [formData, updateformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [agreed, setAgreed] = useState(false);
  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  const handleSubmit = () => {
    console.log("Submitted data:", formData);
    const { firstName, lastName, email, password } = formData;
    console.log(firstName);

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    // setError("Please fill in all fields.");
    // return;

    if (!agreed) {
      alert("Kindly agree to the terms and conditions");
      return;
    }
    if (firstName && lastName && email && password && agreed) {
      localStorage.setItem("mainSignup", JSON.stringify(formData));
      console.log("Signed Up successful");
      alert(`Hello, ${firstName} you have successfully signed up`);

      updateformData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setAgreed(false);
      navigate("/Login");
    }
  };

  return (
    <div className="flex flex-col  h-screen  m-auto w-[20%] justify-center items-center ">
      <div className=" justify-center items-center">
        <div className="m-auto my-5 flex flex-col items-center justify-center w-[100%]">
          <h1 className="text-xl font-extrabold my-3">Frontend Group K</h1>
          <h2 className="font-bold text-lg mb-5"> Registration</h2>

          <h3
            className="h-13 bg-blue-600  p-3 text-white flex items-center justify-center rounded-lg gap-2 cursor-pointer _blank"
            onClick={googleSignin}
          >
            <FcGoogle className="text-xl bg-white rounded-full" />
            <span>Sign in with Google</span>
          </h3>
        </div>

        {/* <h3 className="h-13 bg-blue-600 px-6 py-3 text-white rounded-lg flex items-center justify-center space-x-3 cursor-pointer">
          <FcGoogle className="text-2xl bg-white rounded-full" />
          <span>Sign in with Google</span>
        </h3> */}

        <div className="flex flex-col gap-2 items-center justify-center py-7 rounded-xl shadow ">
          <h2 className="text-md mb-2">or sign up using email</h2>

          <div className="flex flex-col gap-7 justify-left items-left mx-8">
            <input
              className="shadow py-3 w-80 px-3 rounded"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              className="shadow py-3 w-80 px-3 rounded"
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleInputChange}
            />
            <input
              className="shadow py-3 w-80 px-3 rounded"
              type="email"
              value={formData.email}
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              className="shadow py-3 w-80 px-3 rounded"
              type="password"
              value={formData.password}
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-4 flex flex-row gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={handleCheckboxChange}
            />
            <span>
              I agree to the{" "}
              <a href="" className="text-blue-400 cursor-pointer">
                terms and consitions
              </a>
            </span>
          </div>

          <button
            className="h-13 bg-blue-600  p-3 text-white flex items-center justify-center rounded-lg w-70 cursor-pointer"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
        <footer className="flex flex-col items-center m-auto my-5">
          <span>
            Already have an account?{" "}
            <span className="text-blue-400 cursor-pointer" onClick={Login}>
              Sign in
            </span>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
