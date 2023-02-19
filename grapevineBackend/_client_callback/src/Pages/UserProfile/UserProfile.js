import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetUserProfile } from "../../API/GetUserProfile/GetUserProfile";
import "./userProfile.scss";
import { GetUserPost } from "../../API/GetUserPost/GetUserPost";
import { Components, MolecularComponents } from "../../Exports/index";
import { Modal, Button } from "react-bootstrap";
import { InputText } from "../../AtomicComponent";
import { updateUser } from "../../API/Updateuser/UpdateUser";
const Model = ({ handleClose, show, user, setUser }) => {
  const [grape, setGrape] = useState(null);
  const isPositiveInteger = () => {
    if (typeof grape !== "string") {
      return false;
    }

    const num = Number(grape);

    if (Number.isInteger(num) && num > 0) {
      return true;
    }

    return false;
  };
  const addGrapes = () => {
    updateUser({
      user_uuid: user.uuid,
      data: { grapes: parseInt(user.grapes) + parseInt(grape) },
    })
      .then((data) => {
        setGrape(null);
        setUser(data);
        handleClose();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Grapes</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#eaeaea" }}>
          <p
            style={{ fontSize: "20px", textAlign: "center", fontWeight: "600" }}
          >
            {user.username}
          </p>
          <p> Current Grape: {user.grapes}</p>
          <InputText onChange={(e) => setGrape(e.target.value)} value={grape} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isPositiveInteger() ? (
            <Button variant="primary" onClick={addGrapes}>
              Add Grapes
            </Button>
          ) : (
            <Button variant="dark">Add Grapes</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

const UserProfile = () => {
  const {
    UserProfile: { Header, Networks, TabContainer },
  } = Components;
  const { ErrorModal } = MolecularComponents;

  const { uuid } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    GetUserProfile(uuid)
      .then((data) => {
        setUser({ ...data });
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
    GetUserPost(uuid)
      .then((data) => {
        setPosts([...data.result]);
        console.log(posts);
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  }, []);

  if (user)
    return (
      // <Wrapper>
      <div className="userProfile">
        <Model
          show={showModal}
          handleClose={() => setShowModal(false)}
          user={user}
          setUser={setUser}
        />
        <div className="wrapper">
          {user && (
            <>
              <Header
                username={user.username}
                fullname={user.fname + " " + user.lname}
                openModal={() => setShowModal(true)}
              />
              <Networks />
              <TabContainer posts={posts} username={user.username} />
            </>
          )}
          <ErrorModal message={errMessage} setErrMessage={setErrMessage} />
        </div>
      </div>
      // </Wrapper>
    );
  return <div> loading</div>;
};
export default UserProfile;
