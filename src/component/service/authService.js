import customizeAxios from "../setup/customizeAxios";

const registerNewUser = (formData) => {
  return customizeAxios.post("/api/register", {
    formData,
  });
};

const logoutUserService = () => {
  return customizeAxios.post("/api/logout");
};

const check_ssoToken = (ssoToken) => {
  return customizeAxios.post("/api/verify-token",{ssoToken});
};

const doGetAccountService = () => {
  return customizeAxios.get("/api/account");
};

export { registerNewUser, logoutUserService, check_ssoToken,doGetAccountService };
