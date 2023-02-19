import React, { useState, useEffect } from "react";
import InputText from "../InputText/InputText";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./inputPassword.scss";
export default function InputPassword({ onChange, value, placeholder }) {
  const [show, setShow] = useState(true);

  return (
    <div className="inputPassword">
      <div className="icon" onClick={() => setShow(!show)}>
        {show ? <AiFillEye /> : <AiFillEyeInvisible />}
      </div>
      {show ? (
        <InputText
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      ) : (
        <InputText
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type="password"
        />
      )}
    </div>
  );
}
