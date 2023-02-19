import React from "react";
import { updateUser } from "../../API/Updateuser/UpdateUser";
import PrimaryButton from "../../AtomicComponent/Button/PrimaryButton/PrimaryButton";
import "./userCard.scss";
import { Link } from "react-router-dom";
export default function UserCard({ user }) {
  const update = () => {
    updateUser({ user_uuid: user.uuid, data: { featured: !user.featured } })
      .then((data) => window.location.reload(false))
      .catch((err) => console.log(err));
  };


  return (
    <div className="userCard">
      <div>
        <p>
          Username: <label style={{ fontWeight: "600" }}>{user.username}</label>
        </p>
        <p>
          Full Name:{" "}
          <label style={{ fontWeight: "600" }}>
            {user.fname + " " + user.lname}
          </label>
        </p>
        <p>
          Status:{" "}
          {user.featured ? (
            <label style={{ color: "green", fontWeight: "600" }}>
              Featured
            </label>
          ) : (
            <label style={{ color: "red", fontWeight: "600" }}>
              Not Featured
            </label>
          )}
        </p>
        <Link to={`/user-profile/${user.uuid}`}>See Profile</Link>
      </div>
      <div style={{  width: "20%" }}>
        {user.featured ? (
          <PrimaryButton text="Remove" onClick={update} />
        ) : (
          <PrimaryButton text="Add" onClick={update} />
        )}
        <PrimaryButton text= "Posts" style= {{ marginTop: "5px" }} />
        {console.log(user, "this is userconstetes")}
      </div>
    </div>
  );
}
