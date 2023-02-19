import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// server
const baseUrl = "https://admin.grapevine-app.co/api";
// const baseUrl = "http://192.168.1.75:4000/api";
export const grapevineBackend = async (
  url,
  data,
  method,
  headers = {},
  params = ""
) => {
  let access_token = null;
  try {
    let loggedUser = JSON.parse(await AsyncStorage.getItem("user"));
    if (loggedUser) {
      access_token = loggedUser.token;
    }
  } catch (err) {}
  console.log(`${baseUrl}${url}`, data, method);
  const config = {
    method: method || "GET",
    url: `${baseUrl}${url}`,
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: access_token !== null ? `Bearer ${access_token}` : "",
      ...headers,
    },
    data,
    params,
  };

  if (config.method === "GET") {
    delete config.data;
  }
  // console.log({
  //   "Content-Type": "application/json",
  //   // "Access-Control-Allow-Origin": "*",
  //   Accept: "application/json",
  //   Authorization: access_token !== null ? `Bearer ${access_token}` : "",
  //   ...headers,
  // });
  return axios(config)
    .then((d) => {
      return d;
    })
    .catch((err) => {
      throw new Error(err.message + "Network Problem");
    });
};
