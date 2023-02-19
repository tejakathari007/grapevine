import { grapevineBackend } from "../ci.axios";

export const getAccessToken = async (code) => {
  const appId = "awyowg81mowgtks0";
  const appSecret = "426f3d47bb5f6f295fda4f7ded27be5c";
  // let url_access_token = "https://open-api.tiktok.com/oauth/access_token/";
  // url_access_token += "?client_key=" + appId;
  // url_access_token += "&client_secret=" + appSecret;
  // url_access_token += "&code=" + code;
  // url_access_token += "&grant_type=authorization_code";

  let url_access_token = "https://open-api.tiktok.com/oauth/access_token/";
  url_access_token += "?client_key=" + appId;
  url_access_token += "&client_secret=" + appSecret;
  url_access_token += "&code=" + code;
  url_access_token += "&grant_type=authorization_code";

  console.log("url_access_token", url_access_token);
  const demo = await fetch(url_access_token, { method: "POST" })
    .then((res) => res.json())
    .then(async (response) => {
      console.log(response, "response");
      //   if (data.access_token) {
      //     return data;
      //   } else {
      //     return false;
      //   }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return demo;

  //   return demo;
};

// export const loginAdmin = async (value) => {
//   return await grapevineBackend("/admin/login", value, "POST").then(
//     ({ data }) => {
//       console.log(data, "login");
//       if (data.status) {
//         localStorage.setItem("admin", JSON.stringify({ ...data.data }));
//         return data.data;
//       } else {
//         if (data.message.length < 0) throw Error(data.message);
//         else throw Error(data.message);
//       }
//     }
//   );
// };
