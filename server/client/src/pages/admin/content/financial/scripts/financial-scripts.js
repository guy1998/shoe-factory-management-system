import { logout } from "../../../../login/login-scripts";
const url =
  "https://shoe-factory-management-system.onrender.com/dailyStatistics/";
const expensesUrl =
  "https://shoe-factory-management-system.onrender.com/additionalCosts/";

export const getAllFinancials = async (
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
  return data;
};

export const getAllExpenses = async (
  notification,
  navigator,
  startDate,
  endDate
) => {
  const response = await fetch(`${expensesUrl}costByTimeRange`, {
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
    notification.add("Session is expired!", { variant: "info" });
    logout(notification, navigator);
  } else {
<<<<<<< HEAD
      notification.add('The server could not handle the request!', { variant: 'error' });
=======
    notification.add("The request was rejected!", { variant: "error" });
>>>>>>> cc47fa094f6f15e6aa160c82b8bba8f973c049cc
  }
  const expense = data.reduce((acc, expense) => {
    return parseFloat(acc) + parseFloat(expense.quantity.$numberDecimal);
  }, 0);
  return expense;
};

export const createStatistic = async (notification, navigator, products) => {
  const response = await fetch(`${url}create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products }),
    credentials: "include",
  });
  if (response.status === 201) {
<<<<<<< HEAD
    notification.add("The stat was added with success!", {
=======
    notification.add("The statistic was created successfully", {
>>>>>>> cc47fa094f6f15e6aa160c82b8bba8f973c049cc
      variant: "success",
    });
    navigator("/app/financial");
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
};

export const editStatistic = async (
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
<<<<<<< HEAD
    notification.add("The stat was edited with success!", {
=======
    notification.add("The statistic was updated successfully", {
>>>>>>> cc47fa094f6f15e6aa160c82b8bba8f973c049cc
      variant: "success",
    });
    navigator("/app/financial");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("The server was unable to handle the request!", {
      variant: "error",
    });
  }
};

export const getStatisticById = async (notification, navigator, statId) => {
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
    navigator("/app/financial");
  }
  return data;
};

export const getProductionCost = async (notification, navigator) => {
  const response = await fetch(`${url}productionCost`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  let data = 0;
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

export const deleteStat = async (
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
    navigator("/app/financial");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("The statistic does not exist!", {
      variant: "error",
    });
    navigator("/app/financial");
  }
};
