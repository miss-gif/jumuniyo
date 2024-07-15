import axios from "axios";

const API_URL = "/api/restaurant/category";

export const fetchCategories = async () => {
  const { data } = await axios.get(API_URL);

  if (data.statusCode !== 1) {
    throw new Error("카테고리 조회 실패");
  }

  return data.resultData;
};
