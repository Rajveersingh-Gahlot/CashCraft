import api from "./api";

export const getDashboardSummary = async () => {
  const response = await api.get("/api/dashboard/summary");

  return response.data;
};

export const getMonthlySummary = async () => {
  const response = await api.get("/api/dashboard/monthly");

  return response.data;
};

export const getCategorySummary = async (type) => {
  const resposne = await api.get("/api/dashboard/categories", {
    params: { type },
  });

  return resposne.data;
};
