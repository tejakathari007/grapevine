import axios from "axios";
// server
const baseUrl = "https://admin.grapevine-app.co/api";
// localhost
// const baseUrl = "http://192.168.1.70:4000/api";
export const grapevineBackend = async (
  url,
  data,
  method,
  headers = "",
  params = ""
) => {
  let access_token = null;
  try {
    let loggedUser = JSON.parse(localStorage.getItem("admin"));
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
      "Access-Control-Allow-Origin": "*",
      Authorization: access_token !== null ? `Bearer ${access_token}` : "",
      ...headers,
    },
    data,
    params,
  };

  return axios(config);
};
