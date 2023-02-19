import { StyleSheet } from "react-native";
import React from "react";
import { Text, Center, View, Box } from "native-base";
import { useFormik } from "formik";
const { RegisterBrandSchema } = require("../../../FormValidationSchema");
import { AtomComponents, Layout, Hooks } from "../../../Exports/index";

const Register_Brand = ({ navigation }) => {
  const { ButtonDark, Input, InputPassword, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const formik = useFormik({
    initialValues: {
      brand_name: "",
      number: registerData.number,
      address: "",
      email: registerData.email,
      password: "",
    },
    validationSchema: RegisterBrandSchema,
    onSubmit: (values) => {
      setRegisterData({ ...registerData, ...values });
      navigation.navigate("DescribeYouBrand");
    },
  });

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation} next onPress={formik.handleSubmit}>
          <Center>
            <Box w="80%">
              <Box my={5} alignItems="center">
                <Logo />
              </Box>

              <View>
                <View>
                  <Text
                    color={"#fff"}
                    fontSize={12}
                    fontWeight="800"
                    fontFamily="bold"
                  >
                    Brand Name
                  </Text>
                  <Input
                    onChangeText={formik.handleChange("brand_name")}
                    value={formik.values.brand_name}
                    onBlur={formik.handleBlur("brand_name")}
                    status={formik.errors.brand_name ? "danger" : "normal"}
                  />

                  <Text
                    color={"#fff"}
                    fontSize={12}
                    fontWeight="800"
                    fontFamily="bold"
                  >
                    Email
                  </Text>
                  {registerData.email ? (
                    <Input value={registerData.email} editable={false} />
                  ) : (
                    <Input
                      onChangeText={formik.handleChange("email")}
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      status={formik.errors.email ? "danger" : "normal"}
                    />
                  )}
                  <Text
                    color={"#fff"}
                    fontSize={12}
                    fontWeight="800"
                    fontFamily="bold"
                  >
                    Phone Number
                  </Text>
                  {registerData.fixedNumber ? (
                    <Input value={registerData.number} editable={false} />
                  ) : (
                    <Input
                      onChangeText={formik.handleChange("number")}
                      value={formik.values.number}
                      onBlur={formik.handleBlur("number")}
                      status={formik.errors.number ? "danger" : "normal"}
                    />
                  )}

                  <Text
                    color={"#fff"}
                    fontSize={12}
                    fontWeight="800"
                    fontFamily="bold"
                  >
                    Location
                  </Text>
                  <Input
                    onChangeText={formik.handleChange("address")}
                    value={formik.values.address}
                    onBlur={formik.handleBlur("address")}
                    status={formik.errors.address ? "danger" : "normal"}
                  />

                  <Text
                    color={"#fff"}
                    fontSize={12}
                    fontWeight="800"
                    fontFamily="bold"
                  >
                    Password
                  </Text>
                  <InputPassword
                    onChangeText={formik.handleChange("password")}
                    value={formik.values.password}
                    onBlur={formik.handleBlur("password")}
                    status={formik.errors.password ? "danger" : "normal"}
                  />
                </View>
                <View p="5">
                  <Text
                    color="#fff"
                    fontWeight={"500"}
                    fontSize={12}
                    textAlign="center"
                    fontFamily="bold"
                  >
                    By continuing, you agree to our{" "}
                    <Text color="dark" fontFamily="bold">
                      {" "}
                      Terms of Services
                    </Text>{" "}
                    and
                    <Text color="dark" fontFamily="bold">
                      {" "}
                      Privacy Policy
                    </Text>
                  </Text>
                </View>
              </View>
            </Box>
          </Center>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default Register_Brand;
