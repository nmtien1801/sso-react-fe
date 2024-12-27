import customizeAxios from "../setup/customizeAxios";

const registerNewUser = (formData) => {
  return customizeAxios.post("/api/register", {
    formData,
  });
};

const logoutUser = () => {
  return customizeAxios.post("/api/v1/logout");
};

const check_ssoToken = (ssoToken) => {
  return customizeAxios.post("/api/verify-token",{ssoToken});
};

export { registerNewUser, logoutUser, check_ssoToken };
