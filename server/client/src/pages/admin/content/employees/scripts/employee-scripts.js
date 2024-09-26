import { logout } from "../../../../login/login-scripts";
const url = "https://durresshoesdeployment.onrender.com/employers/";

export const getEmployees = async (notification, navigator) => {
  const response = await fetch(`${url}allWorkers`, {
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

const validateEmployee = (notification, employeeInfo) => {
  if (!employeeInfo.name || !employeeInfo.surname || !employeeInfo.costPerDay) {
    notification.add(
      "Ci sono alcune informazioni mancanti! Compila tutti i campi prima di inviare per favore!",
      { variant: "error" }
    );
    return false;
  }
  return true;
};

export const addEmployee = async (notification, navigator, employeeInfo) => {
  if (validateEmployee(notification, employeeInfo)) {
    const response = await fetch(`${url}create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeInfo),
      credentials: "include",
    });
    if (response.status === 201) {
      notification.add("Il operaio è stato aggiunto correttamente!", {
        variant: "success",
      });
      navigator("/app/employees/");
    } else if (response.status === 401) {
      logout(notification, navigator);
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

export const getEmployeeInfo = async (notification, navigator, employeeId) => {
  const response = await fetch(`${url}getById/${employeeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  let data = null;
  if (response.status === 200) {
    data = await response.json();
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("Il operaio non esiste!", { variant: "error" });
    navigator("/app/employees/");
  }
  return data;
};

export const editEmployee = async (
  notification,
  navigator,
  employeeInfo,
  employeeId
) => {
  if (validateEmployee(notification, employeeInfo)) {
    const response = await fetch(`${url}updateEmployee`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workerId: employeeId, newInfo: employeeInfo }),
      credentials: "include",
    });
    if (response.status === 200) {
      notification.add("Il operaio è stato aggiornato con successo!", {
        variant: "success",
      });
      navigator("/app/employees/");
    } else if (response.status === 401) {
      logout(notification, navigator);
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

export const deleteEmployee = async (
  notification,
  navigator,
  employeeId,
  dependency
) => {
  const response = await fetch(`${url}deleteById/${employeeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 200) {
    dependency(true);
    notification.add("Il operaio è stato eliminato con successo!!", {
      variant: "success",
    });
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add(
      "Il server non è stato in grado di gestire la richiesta!",
      {
        variant: "error",
      }
    );
  }
};
