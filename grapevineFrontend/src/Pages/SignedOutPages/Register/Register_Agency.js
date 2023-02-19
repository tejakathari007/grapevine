import React from "react";
import { Text, Center, View, Box } from "native-base";
import { Formik, useFormik } from "formik";
const { RegisterAgencySchema } = require("../../../FormValidationSchema");
import { AtomComponents, Modal, Layout, Hooks } from "../../../Exports/index";

const Register_Agency = ({ navigation }) => {
  const { ButtonDark, Input, InputPassword, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const formik = useFormik({
    initialValues: {
      agency_name: "",
      number: registerData.number,
      address: "",
      email: registerData.email,
      password: "",
    },
    validationSchema: RegisterAgencySchema,
    onSubmit: (values) => {
      console.log("submitted");
      setRegisterData({ ...registerData, ...values });
      navigation.navigate("EnterDob");
    },
  });

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation} next onPress={formik.handleSubmit}>
          <Center>
            <Box p={5} w="80%">
              <Box mb={5} alignItems="center">
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
                    Agency Name
                  </Text>
                  <Input
                    onChangeText={formik.handleChange("agency_name")}
                    value={formik.values.agency_name}
                    onBlur={formik.handleBlur("agency_name")}
                    status={formik.errors.agency_name ? "danger" : "normal"}
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
                    fontSize={12}
                    textAlign="center"
                    fontFamily="light"
                  >
                    By continuing, you agree to our{" "}
                    <Text color="dark"> Terms of Services</Text> and
                    <Text color="dark"> Privacy Policy</Text>
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

export default Register_Agency;
