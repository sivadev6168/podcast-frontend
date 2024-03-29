import { jwtDecode } from "jwt-decode";

export const getRoles = () => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  return decode.role;
};

export const getId = () => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  return decode.id;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000; //this is used to take the time in seconds
    return decode.exp > currentTime; //if expity is greater than current time it will be executed
  } catch (e) {
    return false;
  }
};

export const checkPermission = (roles) => {
  const loggedUserRole = getRoles();
  return roles.includes(loggedUserRole);
};
