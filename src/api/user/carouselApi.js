import axios from "axios";

export const TEST = async () => {
  try {
    const API_URL = ``;
    const response = await axios.get(API_URL);
    console.log("response", response);
  } catch (error) {
    console.log(error);
  }
};
