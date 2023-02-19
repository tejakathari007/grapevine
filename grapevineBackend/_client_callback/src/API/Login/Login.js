import { grapevineBackend } from "../ci.axios";

export const loginAdmin = async (value) => {
  return await grapevineBackend("/admin/login", value, "POST").then(
    ({ data }) => {
      console.log(data, "login")
      if (data.status) {
        localStorage.setItem("admin", JSON.stringify({ ...data.data }));
        return data.data;
      } else {
        if (data.message.length < 0) throw Error(data.message);
        else throw Error(data.message);
      }
    }
  );
};
