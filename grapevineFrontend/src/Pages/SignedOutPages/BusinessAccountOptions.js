import { Box, Pressable, Text, View } from "native-base";
import { AtomComponents, Modal, Layout, Hooks } from "../../Exports/index";

const BusinessAccountOptions = ({ navigation }) => {
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();
  const { Logo } = AtomComponents;
  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <View w="100%" alignItems={"center"}>
            <Logo />
            <Box pt="5%" px={5}>
              <Pressable
                w="100%"
                onPress={() => {
                  setRegisterData({
                    ...registerData,
                    account_type: "Brand",
                  });
                  navigation.navigate("Register_Brand");
                }}
                bg={"light"}
                borderWidth="2"
                borderColor="dark"
                borderRadius="lg"
              >
                <Box padding="2">
                  <Text
                    fontSize={14}
                    color="#fff"
                    fontWeight={"800"}
                    fontFamily="bold"
                    mb="2"
                  >
                    Create a new account
                  </Text>
                </Box>
              </Pressable>
            </Box>
            <Box pt="5%" px={5}>
              <Pressable
                w="100%"
                onPress={() => {
                  setRegisterData({
                    ...registerData,
                    account_type: "Employee",
                  });
                  navigation.navigate("Register");
                }}
                bg={"light"}
                borderWidth="2"
                borderColor="dark"
                borderRadius="lg"
              >
                <Box padding="2">
                  <Text
                    fontSize={14}
                    color="#fff"
                    fontWeight={"800"}
                    fontFamily="bold"
                    mb="2"
                  >
                    Join existing business account
                  </Text>
                </Box>
              </Pressable>
            </Box>
          </View>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default BusinessAccountOptions;
