import { View, Text, Flex, Image, Box, Center, Pressable } from "native-base";
import React from "react";
import { ActivityProfile } from "../../MoleculeComponents/index";

const Activity = (props) => {
  const {
    user: { about, intrests },
    activities,
    navigation,
  } = props;
  return (
    <View p={5}>
      <Box pb="10%">
        <Text fontSize={14} fontWeight="800" color="#000">
          Activity
        </Text>
        {activities.map((activity) => {
          return (
            <ActivityProfile
              activity={activity}
              navigation={navigation}
              key={activity.uuid}
            />
          );
        })}
      </Box>
      <Box
        borderBottomWidth={0.5}
        pt="5%"
        pb="5%"
        borderBottomColor={"#a7a7a7"}
      >
        <Text fontSize={14} fontWeight="800" color="#000">
          About
        </Text>
        <Text fontSize={11} fontWeight="300" color="#8f8f8f" mt={1} mb={1}>
          {about
            ? about
            : "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrycenturies, but also the leap into electronic typesetting, has been the i centuries, but also the leap into electronic typesetting, has been the"}
        </Text>
      </Box>
      <Box
        borderBottomWidth={0.5}
        pt="5%"
        pb="5%"
        borderBottomColor={"#a7a7a7"}
      >
        <Text fontSize={14} fontWeight="800" color="#000">
          Collaborations
        </Text>
        <Center>
          <Image
            alt="image"
            source={require("../../../assets/Images/1.png")}
            h={50}
            w={50}
          />
        </Center>
      </Box>
      <Box
        borderBottomWidth={0.5}
        pt="5%"
        pb="5%"
        borderBottomColor={"#a7a7a7"}
      >
        <Text fontSize={14} fontWeight="800" color="#000">
          Intrests
        </Text>
        <Flex direction="row" justifyContent={"flex-start"} alignItems="center">
          {intrests.map((intrest) => {
            return (
              <Box key={intrest} bg="primary" m={2} p={2} borderRadius="md">
                <Text color="#fff" fontSize={12} fontWeight="800">
                  {intrest}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </View>
  );
};

export default Activity;
