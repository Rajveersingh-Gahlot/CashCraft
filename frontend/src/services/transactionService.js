import api from "./api";

export const getAllTransactions = async () => {
  const response = await api.get("/api/transactions");

  return response.data;
};

export const createTransaction = async (transactionData) => {
  const response = await api.post("/api/transactions", transactionData);

  return response.data;
};

export const updateTransaction = async (id, transactionData) => {
  const response = await api.put(`/api/transactions/${id}`, transactionData);

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/api/transactions/${id}`);

  return response.data;
};
