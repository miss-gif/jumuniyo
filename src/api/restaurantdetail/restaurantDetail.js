import axios from "axios";

export const fetchRestaurantData = async id => {
  try {
    const response = await axios.get(`/api/restaurant/${id}`);
    return response.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMenuData = async id => {
  try {
    const response = await axios.get(`/api/restaurantdetail/${id}/menu`);
    console.log("fetchMenuData response: ", response.data);
    return response.data.resultData.menuList || [];
  } catch (error) {
    console.log(error);
  }
};

export const fetchReviewData = async resPk => {
  try {
    const response = await axios.get(`/api/rev/reviewlist?resPk=${resPk}`);
    return response.data.resultData;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message,
    );
  }
};
