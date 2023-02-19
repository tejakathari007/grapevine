import React, { useState, useEffect } from "react";
import { Box, Text, Button, Center } from "native-base";
import Notification from "./Notification";

const NotificationContainer = ({ time, notifications }) => {
  return (
    <Box>
      {notifications.length > 0 ? (
        <>
          <Text fontSize="13px" color={"#8a8b90"} fontWeight="800">
            {time}
          </Text>

          <Box pl="5px" pr="5px">
            {notifications.map((_notification) => {
              return (
                <Notification
                  key={_notification.uuid}
                  profileImage={require("../../../assets/Images/1.png")}
                  message={_notification.type}
                  time="2h"
                  username={_notification.user.username}
                />
              );
            })}
          </Box>
        </>
      ) : (
        <Text textAlign={"center"}>No Notifications</Text>
      )}
    </Box>
  );
};

export default NotificationContainer;
