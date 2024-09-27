import { logout } from "../../../../login/login-scripts";
const url = "https://shoe-factory-management-system.onrender.com/login/";
const authUrl = "https://shoe-factory-management-system.onrender.com/auth/";

export const getUsers = async (notification, navigator) => {
  const response = await fetch(`${url}get-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  let data = [];
  if (response.status === 200) {
    data = await response.json();
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add(
      "Il server non è stato in grado di gestire la richiesta!",
      { variant: "error" }
    );
  }
  return data;
};

const validateUser = (notification, user) => {
  if (!user.username || !user.password || !user.name || !user.surname) {
    notification.add("Ci sono alcune informazioni mancanti!", {
      variant: "error",
    });
    return false;
  }
  return true;
};

export const addUser = async (notification, navigator, user) => {
  if (validateUser(notification, user)) {
    const response = await fetch(`${url}create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });
    if (response.status === 201) {
      notification.add("L'utente è stato creato con successo!", {
        variant: "success",
      });
      navigator("/app/user");
    } else if (response.status === 401) {
      logout(notification, navigator);
    } else if (response.status === 400) {
      const message = await response.json();
      notification.add(message.message, { variant: "error" });
    } else {
      notification.add(
        "Il server non è stato in grado di gestire la richiesta!",
        {
          variant: "error",
        }
      );
    }
  }
};

export const changeUserStatus = async (
  notification,
  navigator,
  userId,
  newInfo,
  dependency
) => {
  const response = await fetch(`${url}change-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, newInfo }),
    credentials: "include",
  });
  if (response.status === 200) {
    notification.add("User was edited with success!", {
      variant: "success",
    });
    dependency(true);
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add(
      "The server could not handle the request!",
      {
        variant: "error",
      }
    );
  }
};

export const checkUserSectionAccess = async (
  notification,
  navigator,
  dependency
) => {
  const response = await fetch(`${authUrl}auth-user-section`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 200) {
    dependency(false);
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else if (response.status === 403) {
    notification.add("You do not have access to this section!", {
      variant: "info",
    });
    navigator("/app/dashboard");
  } else {
    notification.add(
      "The server could not handle the request!",
      {
        variant: "error",
      }
    );
  }
};
