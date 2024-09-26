import { logout } from "../../../../login/login-scripts";
const url = "https://durresshoesdeployment.onrender.com/dailyStatistics/";
const fierUrl = "https://durresshoesdeployment.onrender.com/fierStatistics/";
const otherCostUrl = "https://durresshoesdeployment.onrender.com/additionalCosts/";

export const getProductsManufactured = async (notification, navigator) => {
  const now = new Date();
  const startDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
  );
  const endDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  );
  const response = await fetch(`${url}timeRange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate, endDate }),
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
      {
        variant: "error",
      }
    );
  }
  const productsManufactured = data.reduce((acc, stat) => {
    return acc + stat.products.length;
  }, 0);
  return productsManufactured;
};

export const getWeeklyStats = async (notification, navigator) => {
  const now = new Date();
  const firstDay = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0)
  );
  const lastDay = new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    )
  );
  const response = await fetch(`${url}timeRange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate: firstDay, endDate: lastDay }),
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
      {
        variant: "error",
      }
    );
  }
  return data;
};

export const getMonthlyProfit = async (notification, navigator) => {
  const now = new Date();
  const startDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
  );
  const endDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  );
  const response = await fetch(`${url}timeRange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate, endDate }),
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
      {
        variant: "error",
      }
    );
  }
  const profit = data.reduce((acc, stat) => {
    return parseFloat(acc) + parseFloat(stat.profit.$numberDecimal);
  }, 0);
  return profit;
};

export const getFierMonthlyProfit = async (notification, navigator) => {
  const now = new Date();
  const startDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
  );
  const endDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  );
  const response = await fetch(`${fierUrl}timeRange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate, endDate }),
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
      {
        variant: "error",
      }
    );
  }
  const profit = data.reduce((acc, stat) => {
    return parseFloat(acc) + parseFloat(stat.profit.$numberDecimal);
  }, 0);
  return profit;
}

export const getMonthlyCost = async (notification, navigator) => {
  const now = new Date();
  const startDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
  );
  const endDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  );
  const response = await fetch(`${url}timeRange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate, endDate }),
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
      {
        variant: "error",
      }
    );
  }
  const cost = data.reduce((acc, stat) => {
    return parseFloat(acc) + parseFloat(stat.productionCost.$numberDecimal);
  }, 0);

  const additionalResponse = await fetch(`${otherCostUrl}costByTimeRange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate, endDate }),
    credentials: "include",
  });
  let data2 = [];
  if (response.status === 200) {
    data2 = await additionalResponse.json();
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
  const cost2 = data2.reduce((acc, stat) => {
    return parseFloat(acc) + parseFloat(stat.quantity.$numberDecimal);
  }, 0);
  return parseFloat(cost) + parseFloat(cost2);
};
