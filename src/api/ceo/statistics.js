import axios from "axios";

export const getMonthSales = async month => {
  const response = await axios.get(`/api/stat/month_sales?date=${month}`);
  return response.data;
};

export const getMonthOrderCount = async month => {
  const response = await axios.get(`/api/stat/month_order_count?date=${month}`);
  return response.data;
};

export const getDailySales = async date => {
  const response = await axios.get(`/api/stat/daily_sales?date=${date}`);
  return response.data;
};

export const getDailyOrderCount = async date => {
  const response = await axios.get(`/api/stat/daily_order_count?date=${date}`);
  return response.data;
};
