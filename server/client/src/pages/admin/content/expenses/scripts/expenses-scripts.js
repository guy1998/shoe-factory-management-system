import { logout } from "../../../../login/login-scripts";

const url = "https://durresshoesdeployment.onrender.com/additionalCosts/";

const validateExpense = (notification, expense)=>{
    if(!expense.quantity || !expense.name || !expense.date){
        notification.add('Mancano informazioni!', { variant: 'error' });
        return false;
    }
    return true;
}

export const createAdditionalCost = async (notification, navigator, expense)=>{
    if(validateExpense(notification, expense)){
        const response = await fetch(`${url}create`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(expense),
            credentials: 'include'
        })
        if(response.status === 200){
            notification.add('La nuova spesa è stata creata correttamente', { variant: 'success' });
            navigator('/app/spese')
        } else if(response.status === 401){
            notification.add('Session is expired!', { variant: 'info' });
            logout(notification, navigator);
        } else {
            notification.add('La richiesta e\' stata respinta!', { variant: 'error' });
        }
    }
}

export const getAllExpenses = async (notification, navigator, startDate, endDate)=>{
    const response = await fetch(`${url}costByTimeRange`, {
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
    return data;
}

export const deleteExpense = async (notification, navigator, expenseId, dependency)=>{
    const response = await fetch(`${url}deleteById/${expenseId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'
        },
        credentials: 'include'
    })
    if(response.status === 200){
        notification.add('La spesa è stata cancellata correttamente', { variant: 'success' });
        dependency(true)
    } else if(response.status === 401){
        notification.add('Session is expired!', { variant: 'info' });
        logout(notification, navigator);
    } else {
        notification.add('La richiesta e\' stata respinta!', { variant: 'error' });
    }
}

export const getExpenseById = async (notification, navigator, expenseId)=>{
    const response = await fetch(`${url}getById/${expenseId}`, {
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
        notification.add('La sessione è finita')
        logout(notification, navigator);
      } else {
        notification.add("La spesa non esiste!", { variant: "error" });
        navigator("/app/spese/");
      }
      return data;
}

export const updateExpense = async (notification, navigator, costId, costInfo) => {
    const response = await fetch(`${url}edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ costId, costInfo }),
        credentials: 'include'
    })
    if(response.status === 200){
        notification.add('La spesa è stata aggiornata correttamente', { variant: 'success' });
        navigator('/app/spese')
    } else if(response.status === 401){
        notification.add('Session is expired!', { variant: 'info' });
        logout(notification, navigator);
    } else {
        notification.add('La richiesta e\' stata respinta!', { variant: 'error' });
    }
}