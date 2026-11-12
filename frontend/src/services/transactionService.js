import api from "./api";

export const getAllTransactions = async () => {
  const response = await api.get("/api/transactions");

  return response.data;
};
