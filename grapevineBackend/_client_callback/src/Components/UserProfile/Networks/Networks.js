import React from "react";
import "./network.scss";
export default function Networks() {
  return (
    <div className="network">
      <p id="text-1">Molly’s Networks</p>
      <div className="row">
        <div className="col">
          <img src={require("../../../Assets/Logo.png")} className="icon" />
        </div>
        <div className="col">
          <img
            src={require("../../../Assets/instagram.png")}
            className="icon"
          />
        </div>
        <div className="col">
          <img src={require("../../../Assets/tiktok.png")} className="icon" />
        </div>
        <div className="col">
          <img src={require("../../../Assets/youtube.png")} className="icon" />
        </div>
      </div>
    </div>
  );
}
