import React from "react";
import { Box } from "native-base";
import { MolecularComponents, Layout } from "../../Exports/index";
const Community = () => {
  const { CommunityPosts } = MolecularComponents;
  const { SignInLayout } = Layout;

  const data = [1, 2, 3, 4, 5];
  return (
    <SignInLayout>
      <Box h="100%" w="100%" alignItems={"center"}>
        {data.map((d) => {
          return <CommunityPosts key={d} />;
        })}
      </Box>
    </SignInLayout>
  );
};

export default Community;
