import url from "../../url";

const login = (email, password) => {
  return fetch(`${url}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};
export default login;
