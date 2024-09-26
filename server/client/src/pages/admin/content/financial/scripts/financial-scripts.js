import { logout } from "../../../../login/login-scripts";
const url = "https://durresshoesdeployment.onrender.com/dailyStatistics/";
const expensesUrl = "https://durresshoesdeployment.onrender.com/additionalCosts/";

export const getAllFinancials = async (notification, navigator, startDate, endDate) => {
  const response = await fetch(`${url}timeRange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startDate: new Date(Date.UTC(startDate.year(), startDate.month(),startDate.date(),  0, 0, 0)), endDate: new Date(Date.UTC(endDate.year(), endDate.month(), endDate.date(), 23, 59, 59)) }),
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

export const getAllExpenses = async (notification, navigator, startDate, endDate)=>{
  const response = await fetch(`${expensesUrl}costByTimeRange`, {
      method: 'POST',
      headers: {
          "Content-Type": 'application/json'
      },
      body: JSON.stringify({ startDate: new Date(Date.UTC(startDate.year(), startDate.month(),startDate.date(),  0, 0, 0)), endDate: new Date(Date.UTC(endDate.year(), endDate.month(), endDate.date(), 23, 59, 59)) }),
      credentials: 'include'
  })
  let data = []
  if(response.status === 200){
      data = await response.json();
  } else if(response.status === 401){
      notification.add('Session is expired!', { variant: 'info' });
      logout(notification, navigator);
  } else {
      notification.add('La richiesta e\' stata respinta!', { variant: 'error' });
  }
  const expense = data.reduce((acc, expense)=>{
    return parseFloat(acc) + parseFloat(expense.quantity.$numberDecimal);
  }, 0);
  return expense
}

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
    notification.add("La statistica è stata aggiunta con successo!", {
      variant: "success",
    });
    navigator("/app/financial");
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
    notification.add("La statistica è stata aggiunta con successo!", {
      variant: "success",
    });
    navigator("/app/financial");
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
    notification.add("La statistica non esiste!", {
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
    notification.add(
      "Il server non è stato in grado di gestire la richiesta!",
      {
        variant: "error",
      }
    );
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
    notification.add("Eliminato con successo!", { variant: "success" });
    dependency(true);
    navigator("/app/financial");
  } else if (response.status === 401) {
    logout(notification, navigator);
  } else {
    notification.add("La statistica non esiste!", {
      variant: "error",
    });
    navigator("/app/financial");
  }
};
