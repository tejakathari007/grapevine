import React from "react";
import "./primaryButton.scss";
export default function PrimaryButton(props) {
  return (
    <div className="primaryButton" {...props}>
      {props.text}
    </div>
  );
}
