import { RootSiblingParent } from "react-native-root-siblings";
import React from "react";

const ExpoToastContext = ({ children }) => {
  return <RootSiblingParent>{children}</RootSiblingParent>;
};

export default ExpoToastContext;
