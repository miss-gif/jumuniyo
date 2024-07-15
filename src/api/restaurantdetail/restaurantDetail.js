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
