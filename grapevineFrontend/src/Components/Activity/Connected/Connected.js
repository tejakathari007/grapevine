import React from "react";
import { Spinner, View, Text, Box } from "native-base";
import { MolecularComponents } from "../../../Exports";
const { Activity } = MolecularComponents;
const Connected = ({ connectedActivities, navigation }) => {
  if (connectedActivities.isLoading) {
    return <Spinner />;
  }

  if (
    connectedActivities.isError ||
    !connectedActivities.data?.pages[0].result.length > 0
  )
    return (
      <Text fontFamily="bold" textAlign={"center"}>
        No Activity To Show
      </Text>
    );
  return (
    <>
      <Box pb="70" p={2}>
        {connectedActivities.data?.pages.map((page) =>
          page.result.map((activity, index) => (
            <Activity
              activity={activity}
              navigation={navigation}
              key={activity.uuid}
            />
          ))
        )}
      </Box>
    </>
  );
};

export default Connected;
