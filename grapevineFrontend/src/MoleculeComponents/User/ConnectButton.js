import React, { useContext, useEffect, useState } from "react";
import { View, Button, Spinner } from "native-base";
import { UserValue } from "../../Context/UserContext";
import Acceptfriendrequest from "../../Hooks/FriendRequest/acceptFriendRequest";
import Sendfriendrequest from "../../Hooks/FriendRequest/sendFriendRequest";

const ConnectButton = (props) => {
  const { friendship_status, user_uuid } = props;
  const [friendship, setFriendship] = useState(null);
  const [user, setUser] = useContext(UserValue);
  const sendFriendRequest = Sendfriendrequest();
  const acceptFriendRequest = Acceptfriendrequest();
  useEffect(() => {
    if (friendship_status) {
      setFriendship({ ...friendship_status });
      if (friendship_status.accepted) {
        setFriendship({
          ...friendship_status,
          friendship_uuid: friendship_status.uuid,
          status: "accepted",
          action: "none",
        });
      } else {
        if (friendship_status.user_accept == user.uuid) {
          setFriendship({
            ...friendship_status,
            friendship_uuid: friendship_status.uuid,
            status: "pending",
            action: "accept",
          });
        } else {
          setFriendship({
            ...friendship_status,
            friendship_uuid: friendship_status.uuid,
            status: "pending",
            action: "wait",
          });
        }
      }
    }
  }, [friendship_status]);

  //   return (
  //     <Button h="60%" pt="0" pb="0" bg="primary" mx={2}>
  //       Friends
  //     </Button>
  //   );
  if (friendship) {
    return friendship.status == "accepted" ? (
      <Button {...props}>Friends</Button>
    ) : friendship.action == "accept" ? (
      <Button
        {...props}
        onPress={() => {
          acceptFriendRequest.mutate({
            friendship_uuid: friendship.uuid,
            user_accept: user.uuid,
          });
        }}
      >
        Accept
      </Button>
    ) : (
      <Button {...props}>Req Sent</Button>
    );
  }

  return (
    <Button
      {...props}
      onPress={() => {
        sendFriendRequest.mutate({
          user_request: user.uuid,
          user_accept: user_uuid,
        });
      }}
    >
      {sendFriendRequest.isLoading ? (
        <Spinner accessibilityLabel="Loading" />
      ) : (
        "Connect"
      )}
    </Button>
  );
};

export default ConnectButton;
