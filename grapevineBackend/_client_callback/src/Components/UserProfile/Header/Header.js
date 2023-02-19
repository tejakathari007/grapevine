import React from "react";
import PrimaryButton from "../../../AtomicComponent/Button/PrimaryButton/PrimaryButton";
import "./header.scss";
export default function Header({ username, fullname, openModal }) {
  return (
    <div className="user-header">
      <div className="container">
        <div>
          <img
            src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
            className="avatar"
          />
          <p className="text-1">{`${fullname}`}</p>
        </div>
        <div>
          <p className="text-1">{`@ ${username}`}</p>
          <div className="row">
            <div className="col-4 line">
              <p className="number">2k</p>
              <p className="text-2">Posts</p>
            </div>
            <div className="col-4 line">
              <p className="number">4M</p>
              <p className="text-2">Followers</p>
            </div>
            <div className="col-4">
              <p className="number">100+</p>
              <p className="text-2">Connections</p>
            </div>
          </div>
          <p className="text-3">Top 5.8% of all crea</p>

          <PrimaryButton text="Add Grapes" onClick={openModal} />
        </div>
      </div>
      <p className="text-4">
        is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industrycenturies, but also the leap into electronic
        typesetting, has been the industrycenturies, but als has been the
        industrycenrem… more
      </p>
    </div>
  );
}
