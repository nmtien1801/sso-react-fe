import customizeAxios from "../setup/customizeAxios";

const createNewPath_service = (pathData) => {
  return customizeAxios.post("/api/path/create", [...pathData]);
};

const getAllPath_service = () => {
  return customizeAxios.get("/api/path/read");
};

const deletePath_service = (pathId) => {
  return customizeAxios.delete(`/api/path/delete/${pathId}`);
};

const getPathByRoleId_service = (roleId) => {
  return customizeAxios.get(`/api/path/by-role/${roleId}`);
};

const authenticateRole_service = (data) => {
  return customizeAxios.post("/api/path/authenticateRole", { data });
};

const getRole_service = () => {
  return customizeAxios.get("/api/role/read");
};

export {
  createNewPath_service,
  getAllPath_service,
  deletePath_service,
  getPathByRoleId_service,
  authenticateRole_service,
  getRole_service,
};
