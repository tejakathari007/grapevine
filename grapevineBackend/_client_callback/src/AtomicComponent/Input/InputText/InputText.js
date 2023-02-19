import React from "react";
import "./inputtext.scss";
export default function InputText({
  onChange,
  value,
  placeholder,
  type = "text",
}) {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="inputText"
    />
  );
}
