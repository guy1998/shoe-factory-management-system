import { logout } from "../../../../login/login-scripts";
const url = "https://durresshoesdeployment.onrender.com/article/";

export const getProducts = async (notification, navigator) => {
  const response = await fetch(`${url}allArticles`, {
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
      {
        variant: "error",
      }
    );
  }
  return data;
};

const validateProduct = (notification, product) => {
  if (!product.code || !product.costPerArticle) {
    notification.add("Ci sono alcune informazioni mancanti!", {
      variant: "error",
    });
    return false;
  }
  return true;
};

export const createProduct = async (notification, navigator, product) => {
  const verified = validateProduct(notification, product);
  if (verified) {
    const response = await fetch(`${url}create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
      credentials: "include",
    });
    if (response.status === 201) {
      notification.add("Il prodotto è stato aggiunto con successo!", {
        variant: "success",
      });
      navigator("/app/products");
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

export const deleteProduct = async (
  notification,
  navigator,
  productId,
  dependency
) => {
  const response = await fetch(`${url}deleteById/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 200) {
    notification.add("Il prodotto è stato eliminato con successo!", {
      variant: "success",
    });
    dependency(true);
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

export const getProductInfo = async (notification, navigator, productId) => {
  const response = await fetch(`${url}article/${productId}`, {
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
    notification.add("Il prodotto non esiste!", {
      variant: "error",
    });
    navigator("/app/products");
  }
  return data;
};

export const editProduct = async (
  notification,
  navigator,
  productId,
  product
) => {
  if (validateProduct(notification, product)) {
    const response = await fetch(`${url}updateProduct`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: productId, newInfo: product }),
      credentials: "include",
    });
    if (response.status === 200) {
      notification.add("Il prodotto è stato aggiornato con successo!", {
        variant: "success",
      });
      navigator("/app/products/");
    } else if (response.status === 401) {
      logout(notification, navigator);
    } else {
      notification.add(
        "Il server non è stato in grado di gestire la richiesta!",
        { variant: "error" }
      );
    }
  }
};
