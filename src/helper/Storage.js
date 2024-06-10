export const setAuthUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};
export const getAuthUser = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
};
export const removeAuthUser = () => {
  if (localStorage.getItem("user")) localStorage.removeItem("user");
  localStorage.clear();
};
export const setUserData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};
export const getUserData = () => {
  if (localStorage.getItem("userData")) {
    return JSON.parse(localStorage.getItem("userData"));
  }
};
export const removeUserData = () => {
  if (localStorage.getItem("userData")) localStorage.removeItem("userData");
  localStorage.clear();
};
