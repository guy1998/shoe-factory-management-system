import { logout } from "../../../../login/login-scripts";
const url =
  "https://shoe-factory-management-system.onrender.com/fierStatistics/";

export const getAllFierFinancials = async (
  notification,
  navigator,
  startDate,
  endDate
) => {
  const response = await fetch(`${url}timeRange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: new Date(
        Date.UTC(startDate.year(), startDate.month(), startDate.date(), 0, 0, 0)
      ),
      endDate: new Date(
        Date.UTC(endDate.year(), endDate.month(), endDate.date(), 23, 59, 59)
      ),
    }),
    credentials: "include",
  });
  let data = [];
  if (response.status === 200) {
    data = await response.json();
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("The server was unable to handle the request!", {
      variant: "error",
    });
  }
  return data;
};

export const createFierStatistic = async (
  notification,
  navigator,
  products
) => {
  const response = await fetch(`${url}create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products }),
    credentials: "include",
  });
  if (response.status === 201) {
    notification.add("The statistic was created successfully", {
      variant: "success",
    });
    navigator("/app/fier");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("The server was unable to handle the request!", {
      variant: "error",
    });
  }
};

export const editFierStatistic = async (
  notification,
  navigator,
  products,
  statId
) => {
  const response = await fetch(`${url}edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products, statId }),
    credentials: "include",
  });
  if (response.status === 200) {
    notification.add("The statistic was updated successfully", {
      variant: "success",
    });
    navigator("/app/fier");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("The server was unable to handle the request!", {
      variant: "error",
    });
  }
};

export const getFierStatisticById = async (notification, navigator, statId) => {
  const response = await fetch(`${url}statistics/${statId}`, {
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
    notification.add("The statistic does not exist", {
      variant: "error",
    });
    navigator("/app/fier");
  }
  return data;
};

export const deleteFierStat = async (
  notification,
  navigator,
  statId,
  dependency
) => {
  const response = await fetch(`${url}deleteById/${statId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 200) {
    notification.add("Deleted successfully", { variant: "success" });
    dependency(true);
    navigator("/app/fier");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("The statistic does not exist", {
      variant: "error",
    });
    navigator("/app/fier");
  }
};
