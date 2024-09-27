import { logout } from "../../../../login/login-scripts";
const url = "https://shoe-factory-management-system.onrender.com/employers/";

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
<<<<<<< HEAD
    notification.add(
      "The server could not handle the request!",
      { variant: "error" }
    );
=======
    notification.add("The server was unable to handle the request!", {
      variant: "error",
    });
>>>>>>> cc47fa094f6f15e6aa160c82b8bba8f973c049cc
  }
  return data;
};

const validateEmployee = (notification, employeeInfo) => {
  if (!employeeInfo.name || !employeeInfo.surname || !employeeInfo.costPerDay) {
    notification.add(
<<<<<<< HEAD
      "There is missing information! Please complete all the fields@",
=======
      "There are information missiong! Please fill in all the fields before submitting!",
>>>>>>> cc47fa094f6f15e6aa160c82b8bba8f973c049cc
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
<<<<<<< HEAD
      notification.add("The employee was added successfully!", {
=======
      notification.add("The worker has been added correctly!", {
>>>>>>> cc47fa094f6f15e6aa160c82b8bba8f973c049cc
        variant: "success",
      });
      navigator("/app/employees/");
    } else if (response.status === 401) {
      logout(notification, navigator);
    } else {
<<<<<<< HEAD
      notification.add(
        "The server could not handle the request!",
        {
          variant: "error",
        }
      );
=======
      notification.add("The server was unable to handle the request!", {
        variant: "error",
      });
>>>>>>> cc47fa094f6f15e6aa160c82b8bba8f973c049cc
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
    notification.add("The emplyee does not exist", { variant: "error" });
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
      notification.add("The employee has been updated successfully", {
        variant: "success",
      });
      navigator("/app/employees/");
    } else if (response.status === 401) {
      logout(notification, navigator);
    } else {
      notification.add("The server was unable to handle the request!", {
        variant: "error",
      });
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
    notification.add("The employee has been deleted successfully", {
      variant: "success",
    });
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("The server was unable to handle the request!", {
      variant: "error",
    });
  }
};
