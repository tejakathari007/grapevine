import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../API/GetAllUsers/GetAllUsers";
import "./gvUsers.scss";
import { AtomicComponent, MolecularComponents } from "../../Exports/index"
import { Layout } from "../../Exports/index";
import Sidebar from "../../Sidebar/Sidebar";

export default function GvUsers() {

  const { Wrapper } = Layout
  const { InputText } = AtomicComponent;
  const { UserCard } = MolecularComponents
  const { ErrorModal } = MolecularComponents

  const [users, setUsers] = useState([]);
  const [showUser, setShowUser] = useState([]);
  const [errMessage, setErrMessage] = useState(null)
  const search = (e) => {
    const text = e.target.value.toLowerCase();
    setShowUser(
      users.filter((u) => u.username.toLowerCase().indexOf(text) == 0)
    );
  };
  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers([...data]);
        setShowUser([...data]);
      })
      .catch((err) => setErrMessage(err.message));
  }, []);

  return (
    <Wrapper>
      <div className="container">
      <Sidebar />
      <div className="gvUsers">
        <h1>Users</h1>
        <div className="wrapper">
          <div style={{ width: "50%" }}>
            <InputText placeholder={"Search"} onChange={search} />
          </div>
          {showUser?.length > 0 &&
            showUser.map((u) => <UserCard user={u} key={u.uuid} />)}
        </div>
        <ErrorModal message={errMessage} setErrMessage= {setErrMessage} />
      </div>
      </div>
    </Wrapper>
  );
}
