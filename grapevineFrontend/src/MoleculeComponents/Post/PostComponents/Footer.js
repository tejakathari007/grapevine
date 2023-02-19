import React, { useEffect } from "react";
import CommentsContainer from "./CommentsContainer";
import { Box, Center, Text, Image, Flex, Pressable, Link } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TabView } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";

const Footer = ({ post, footer, user, index, setIndex }) => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [routes] = React.useState([
    {
      key: "comment",
      title: "comment",
    },
    {
      key: "people",
      title: "people",
    },
    {
      key: "product",
      title: "product",
    },
    {
      key: "inspo",
      title: "inspo",
    },
  ]);

  const renderTabBar = (props) => {
    return <></>;
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "comment":
        return (
          <CommentsContainer
            comments={post.comments}
            user={user}
            post_uuid={post.uuid}
          />
        );
      case "people":
        return (
          <Box width={"100%"}>
            {post.peoples.length >= 1 ? (
              <Box width={"100%"}>
                {post.peoples.map((_people) => {
                  return (
                    <Flex
                      direction="row"
                      justifyContent={"flex-start"}
                      alignItems="center"
                      p={1}
                      key={_people.uuid}
                      borderBottomColor={"#d3d3d3"}
                      borderBottomWidth={1}
                      borderTopColor="#d3d3d3"
                      borderTopWidth={1}
                    >
                      <Link href={_people.link} h={"20"} w={"20"}>
                        <Image
                          source={require("../../../../assets/Images/2.png")}
                          alt="img"
                          h={"20"}
                          w={"20"}
                          flex={1}
                          resizeMethod="resize"
                          resizeMode="contain"
                        />
                      </Link>
                      <Box flex={4} px={2}>
                        <Text fontWeight={"800"} fontSize="16">
                          {_people.role}
                        </Text>
                      </Box>
                    </Flex>
                  );
                })}
              </Box>
            ) : (
              <Text fontSize="14" fontWeight={"500"} fontFamily="light">
                No peoples
              </Text>
            )}
          </Box>
        );
      case "product":
        return (
          <Box width={"100%"}>
            {post.products.length >= 1 ? (
              <Box width={"100%"}>
                {[...post.products].splice(0, 1).map((_product) => {
                  return (
                    <Flex
                      direction="row"
                      justifyContent={"flex-start"}
                      alignItems="center"
                      p={1}
                      key={_product.uuid}
                      borderBottomColor={"#d3d3d3"}
                      borderBottomWidth={1}
                      borderTopColor="#d3d3d3"
                      borderTopWidth={1}
                    >
                      <Link href={_product.link} h={"10"} w={"20"}>
                        <Image
                          source={{
                            uri: `https://admin.grapevine-app.co/api/file/${_product.image}`,
                          }}
                          alt="img"
                          h={"10"}
                          w={"10"}
                          flex={1}
                          resizeMethod="resize"
                          resizeMode="contain"
                        />
                      </Link>
                      <Box flex={4} px={2}>
                        <Text fontWeight={"800"} fontSize="16">
                          {_product.name}
                        </Text>
                      </Box>
                    </Flex>
                  );
                })}
                <Pressable
                  onPress={() => {
                    if (navigation) {
                      navigation.navigate("ProductPage", {
                        post_uuid: post.uuid,
                      });
                    }
                  }}
                >
                  <Text fontSize="14" fontWeight={"500"} fontFamily="light">
                    See All {post.products.length} products
                  </Text>
                </Pressable>
              </Box>
            ) : (
              <Text fontSize="14" fontWeight={"500"} fontFamily="light">
                No Products
              </Text>
            )}
          </Box>
        );
      case "inspo":
        return (
          <Box width={"100%"}>
            {post.inspo ? (
              <Text fontSize="14" fontWeight={"500"}>
                {post.inspo}
              </Text>
            ) : (
              <Text fontSize="14" fontWeight={"500"} fontFamily="light">
                No Inspo
              </Text>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(i) => setIndex(i)}
      initialLayout={{ width: layout.width, height: "100%" }}
      renderTabBar={renderTabBar}
      style={{
        minHeight: 100,
      }}
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
    />
  );

  // switch (footer) {
  //   case "interraction":
  //     return <CommentsContainer comments={post.comments} user={user} />;

  //   case "product":
  //     return (
  //       <Box width={"100%"}>
  //         {post.products.length >= 1 ? (
  //           <Box width={"100%"}>
  //             {post.products.splice(0, 1).map((_product) => {
  //               return (
  //                 <Flex
  //                   direction="row"
  //                   justifyContent={"flex-start"}
  //                   alignItems="center"
  //                   p={1}
  //                   key={_product.uuid}
  //                   borderBottomColor={"#d3d3d3"}
  //                   borderBottomWidth={1}
  //                   borderTopColor="#d3d3d3"
  //                   borderTopWidth={1}
  //                 >
  //                   <Link href={_product.link} h={"20"} w={"20"}>
  //                     <Image
  //                       source={{
  //                         uri: `https://admin.grapevine-app.co/api/file/${_product.image}`,
  //                       }}
  //                       alt="img"
  //                       h={"20"}
  //                       w={"20"}
  //                       flex={1}
  //                       resizeMethod="resize"
  //                       resizeMode="contain"
  //                     />
  //                   </Link>
  //                   <Box flex={4} px={2}>
  //                     <Text fontWeight={"800"} fontSize="16">
  //                       {_product.name}
  //                     </Text>
  //                   </Box>
  //                 </Flex>
  //               );
  //             })}
  //             <Pressable
  //               onPress={() => {
  //                 if (navigation) {
  //                   navigation.navigate("ProductPage", {
  //                     post_uuid: post.uuid,
  //                   });
  //                 }
  //               }}
  //             >
  //               <Text fontSize="14" fontWeight={"500"} fontFamily="light">
  //                 See All {post.products.length} products
  //               </Text>
  //             </Pressable>
  //           </Box>
  //         ) : (
  //           <Text fontSize="14" fontWeight={"500"} fontFamily="light">
  //             No Products
  //           </Text>
  //         )}
  //       </Box>
  //     );
  //   case "people":
  //     return (
  //       <Box width={"100%"}>
  //         {post.peoples.map((_people) => {
  //           return (
  //             <Flex
  //               direction="row"
  //               justifyContent={"flex-start"}
  //               alignItems="center"
  //               p={1}
  //               key={_people.uuid}
  //               borderBottomColor={"#d3d3d3"}
  //               borderBottomWidth={1}
  //               borderTopColor="#d3d3d3"
  //               borderTopWidth={1}
  //             >
  //               <Link href={_people.link} h={"20"} w={"20"}>
  //                 <Image
  //                   source={require("../../../../assets/Images/2.png")}
  //                   alt="img"
  //                   h={"20"}
  //                   w={"20"}
  //                   flex={1}
  //                   resizeMethod="resize"
  //                   resizeMode="contain"
  //                 />
  //               </Link>
  //               <Box flex={4} px={2}>
  //                 <Text fontWeight={"800"} fontSize="16">
  //                   {_people.role}
  //                 </Text>
  //               </Box>
  //             </Flex>
  //           );
  //         })}
  //       </Box>
  //     );
  //   default:
  //     return <CommentsContainer comments={post.comments} user={user} />;
  // }
};

export default Footer;
