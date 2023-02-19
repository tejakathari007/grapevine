import React from "react";
import "./tabcontainer.scss";
const data = [1, 2, 3, 4, 5, 6];
export default function ImageGallorie() {
  return (
    <div className="image-gallorie">
      <div className="row">
        {data.map((d) => {
          return (
            <div className="col-4" key={d}>
              <img
                className="image"
                src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?cs=srgb&amp;dl=pexels-mateus-souza-3586798.jpg&amp;fm=jpg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
