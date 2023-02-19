import React, { useState, useContext } from "react";
import { loginAdmin } from "../../API/Login/Login";
import "./login.scss";
import { AtomicComponent, MolecularComponents } from "../../Exports/index";
import {AdminValue} from "../../Context/AdminContext"

export default function Login() {

  const { PrimaryButton, InputPassword, InputText } = AtomicComponent;
  const { ErrorModal } = MolecularComponents

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(null)

  const { setAdmin } = useContext(AdminValue);
  const log = () => {
    loginAdmin({ email: email, password: password })
      .then((data) => {
        setAdmin({ ...data });
      })
      .catch((err) => {
        setErrMessage(err.message)
      });
  };
  return (
    <div className="login">
      <div className="card">
        <div className="wrapper">
          <img
            src={require("../../Assets/Logo.png")}
            width="50"
            height="50"
            alt=""
          />
          <InputText
            placeholder={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton text={"Login"} onClick={log} />
          <ErrorModal message={errMessage} setErrMessage= {setErrMessage} />
        </div>
      </div>
    </div>
  );
}
