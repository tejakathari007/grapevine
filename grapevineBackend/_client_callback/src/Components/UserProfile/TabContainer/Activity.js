import React from "react";
import "./tabcontainer.scss";

export default function Activity() {
  return (
    <div className="activity">
      <div className="section">
        <p className="text-1">Activity</p>
        <p className="text-2">Molly liked 4 posts</p>
        <div className="row">
          <div className="col-8">
            <div className="flex">
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
            </div>
          </div>
          <div
            className="col-4"
            style={{
              display: "flex",
              flexDirection: "revert",
              alignItems: "center",
            }}
          >
            <p className="text-3">See all Activity</p>
          </div>
        </div>
      </div>

      <div className="section">
        <p className="text-1">About</p>
        <p className="text-4">
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industrycenturies, but also the leap into
          electronic typesetting, has been the i centuries, but also the leap
          into electronic typesetting, has been the industrycenturies, bu …see
          more
        </p>
      </div>

      <div className="section">
        <p className="text-1">Projects</p>
        <div className="row">
          <div className="col-8">
            <div className="flex">
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
            </div>
          </div>
          <div
            className="col-4"
            style={{
              display: "flex",
              flexDirection: "revert",
              alignItems: "center",
            }}
          >
            <p className="text-3">See all Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
}
