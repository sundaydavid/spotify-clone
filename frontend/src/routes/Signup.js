import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { makeUnauthenticatedPostRequest } from "../components/utils/ServerHelpers";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate()

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email mismatch");
      return;
    }

    const data = { email, password, username, firstName, lastName };
    const response = await makeUnauthenticatedPostRequest(
      "/api/auth/register",
      data
    );

    if (response && !response.message) {
      const token = response.jwtToken;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home")
    } else {
      alert("Failure: " + response.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width={140} />
      </div>

      {/*Input details*/}
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-4 text-2xl">
          Signup for free to start listening
        </div>
        <TextInput
          label="Email address"
          placeholder="Enter your mail"
          className="my-6"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm Email address"
          placeholder="Enter your email address again"
          className="mb-6"
          value={confirmEmail}
          setValue={setConfirmEEmail}
        />
        <TextInput
          label="Username"
          placeholder="Enter your username"
          className="mb-6"
          value={username}
          setValue={setUsername}
        />
        <PasswordInput
          label="Create Password"
          placeholder="Enter a strong password here"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex justify-between items-center space-x-8">
          <TextInput
            label="First Name"
            placeholder="Enter Your First Name"
            className="my-6"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter Your Last Name"
            className="my-6"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className="w-full flex items-center justify-center my-8">
          <button
            className="bg-green-500 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            SIGN UP
          </button>
        </div>
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 text-lg font-semibold">Don`t have an account?</div>
        <div className="border border-gray-500 rounded-full w-full flex items-center justify-center py-4 font-bold text-gray-500">
          <Link to="/login"> LOG IN INSTEAD </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
