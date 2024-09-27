import { logout } from "../../../pages/login/login-scripts";
const url = "https://shoe-factory-management-system.onrender.com/login/";

export const getUserInfo = async (notification, navigator) => {
  const response = await fetch(`${url}user-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  let user = null;
  if (response.status === 200) {
    user = response.json();
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add(
      "The server could not handle the request!",
      { variant: "error" }
    );
  }
  return user;
};

const validateUserInfo = (notification, newInfo) => {
  if ((!newInfo.name || !newInfo.surname, !newInfo.username)) {
    notification.add("There is missing information!", {
      variant: "error",
    });
    return false;
  }
  return true;
};

export const editUser = async (
  notification,
  navigator,
  newInfo,
  successAction
) => {
  const verified = validateUserInfo(notification, newInfo);
  if (verified) {
    const response = await fetch(`${url}edit-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newInfo }),
      credentials: "include",
    });
    if (response.status === 200) {
      notification.add("Modified with success!", { variant: "success" });
      successAction();
    } else if (response.status === 401) {
      logout(notification, navigator);
    } else {
      notification.add("The server could not handle the request!", {
        variant: "error",
      });
    }
  }
};

export const changePassword = async (
  notification,
  navigator,
  newPassword,
  oldPassword,
  successAction
) => {
  const response = await fetch(`${url}change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword, oldPassword }),
    credentials: "include",
  });
  if (response.status === 200) {
    notification.add("The password was modified successfully!", { variant: "success" });
    successAction();
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    const message = await response.json();
    notification.add(message.message, { variant: "error" });
  }
};
